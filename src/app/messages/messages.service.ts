import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {


  private errorSubject = new BehaviorSubject<string[]>([]);

  public error$: Observable<string[]> = this.errorSubject.asObservable()
  .pipe(
    filter(message => message && message.length>0)
  )

  constructor() { }

    showErrors(...errors: string[]) {
      this.errorSubject.next(errors);
  }
}
