import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStore {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((res) => res["payload"]),
      catchError((err) => {
        const message = "Faild to load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((courses) => this.coursesSubject.next(courses))
    );

    this.loadingService.showLoaderUntILCompleted(loadCourses$).subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>) {
    const courses = this.coursesSubject.getValue();
    const index = courses.findIndex((course) => course.id == courseId);

    const newCourse = {
      ...courses[index],
      ...changes,
    };

    const newCourses = courses.slice();
    newCourses[index] = newCourse;
    this.coursesSubject.next(newCourses);

    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError((err) => {
        const message = "Failed to save course";
        console.log(message, err);
        this.messagesService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) => {
        return courses
          .filter((course) => course.category == category)
          .sort(sortCoursesBySeqNo);
      })
    );
  }
}
