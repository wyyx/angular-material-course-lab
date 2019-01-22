import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator, PageEvent, MatSort } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { Subject, merge, combineLatest } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  startWith,
  takeUntil,
  tap,
  map,
  filter
} from 'rxjs/operators'
import { Course } from '../model/course'
import { CoursesService } from '../services/courses.service'
import { LessonsDataSource } from '../services/lessons.datasource'

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  kill$: Subject<any> = new Subject()
  course: Course
  dataSource: LessonsDataSource
  displayedColumns = ['seqNo', 'description', 'duration']
  filter = new FormControl('')

  @ViewChild('paginator') paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course']
    this.dataSource = new LessonsDataSource(this.coursesService)
  }

  ngAfterViewInit() {
<<<<<<< HEAD
    // Load lessons
=======
>>>>>>> b9ccd68ec3df29f1b58fd15b5cea943533adee9a
    combineLatest(
      this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 5 } as PageEvent)),
      this.sort.sortChange.pipe(
        startWith({ direction: 'asc' }),
        map(sort => sort.direction),
        filter(direction => !!direction),
        tap(direction => {
          this.paginator.pageIndex = 0
        })
      )
    )
      .pipe(
        mergeMap(([page, direction]) =>
          this.filter.valueChanges.pipe(
            startWith(''),
            debounceTime(200),
            distinctUntilChanged(),
            mergeMap(filter =>
              this.dataSource.loadLessons(
                this.course.id,
                filter,
                direction,
                this.paginator.pageIndex,
                this.paginator.pageSize
              )
            ),
            takeUntil(this.kill$)
          )
        )
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }
}
