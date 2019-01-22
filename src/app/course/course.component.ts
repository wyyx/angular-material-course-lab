import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator, PageEvent } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  startWith,
  takeUntil,
  tap
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

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course']
    this.dataSource = new LessonsDataSource(this.coursesService)
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({ pageIndex: 0, pageSize: 5 } as PageEvent),
        mergeMap(page =>
          this.filter.valueChanges.pipe(
            startWith(''),
            debounceTime(100),
            distinctUntilChanged(),
            mergeMap(filter =>
              this.dataSource.loadLessons(
                this.course.id,
                filter,
                'asc',
                page.pageIndex,
                page.pageSize
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
