import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntILCompleted<T>(obs$: Observable<T>) : Observable<T>  {
    return undefined;
  }

  loadingOn() {

    this.loadingSubject.next(true);
  }

  loadingOff() {
    
    this.loadingSubject.next(false);
  }
}
