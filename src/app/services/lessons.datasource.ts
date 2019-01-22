import { DataSource } from '@angular/cdk/table'
import { Lesson } from '../model/lesson'
import { Observable, BehaviorSubject, Subscription, of, interval } from 'rxjs'
import { CollectionViewer } from '@angular/cdk/collections'
import { CoursesService } from './courses.service'
import { catchError, tap } from 'rxjs/operators'

export class LessonsDataSource extends DataSource<Lesson> {
  lessonsSubject = new BehaviorSubject<Lesson[]>([])

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
    return this.coursesService
      .findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        tap(v => console.log('loadLessons')),
        catchError(error => of([])),
        tap(lessons => this.lessonsSubject.next(lessons))
      )
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonsSubject.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete()
  }
}
