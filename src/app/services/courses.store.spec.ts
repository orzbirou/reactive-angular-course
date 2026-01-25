import { TestBed } from '@angular/core/testing';
import { CoursesStore } from './courses.store';


describe('CoursesStoreService', () => {
  let service: CoursesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
