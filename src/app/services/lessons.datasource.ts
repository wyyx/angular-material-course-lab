import { DataSource } from '@angular/cdk/table'
import { Lesson } from '../model/lesson'
import { Observable, BehaviorSubject, Subscription, of, interval } from 'rxjs'
import { CollectionViewer } from '@angular/cdk/collections'
import { CoursesService } from './courses.service'
import { catchError, tap, finalize } from 'rxjs/operators'

export class LessonsDataSource extends DataSource<Lesson> {
  private lessonsSubject$ = new BehaviorSubject<Lesson[]>([])
  private loadingSubject$ = new BehaviorSubject<boolean>(false)
  loading$: Observable<boolean> = this.loadingSubject$.asObservable()

  constructor(private coursesService: CoursesService) {
    super()
  }

  loadLessons(
    courseId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject$.next(true)

    return this.coursesService
      .findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        tap(v => console.log('loadLessons')),
        catchError(error => of([])),
        tap(lessons => this.lessonsSubject$.next(lessons)),
        tap(() => this.loadingSubject$.next(false)),
        finalize(() => this.loadingSubject$.next(false))
      )
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonsSubject$.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject$.complete()
    this.loadingSubject$.complete()
  }
}
