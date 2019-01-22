import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Course } from '../model/course'
import { CoursesService } from '../services/courses.service'
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  timeout,
  takeUntil,
  take,
  mergeMap,
  map
} from 'rxjs/operators'
import { merge } from 'rxjs/observable/merge'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { LessonsDataSource } from '../services/lessons.datasource'
import { Subject } from 'rxjs'
import { FormControl } from '@angular/forms'

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

  @ViewChild('filterInput') filterInput: ElementRef

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course']
    this.dataSource = new LessonsDataSource(this.coursesService)

    this.filter.valueChanges
      .pipe(
        startWith(''),
        debounceTime(100),
        distinctUntilChanged(),
        mergeMap(filter => this.dataSource.loadLessons(this.course.id, filter, 'asc', 0, 5)),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }
}
