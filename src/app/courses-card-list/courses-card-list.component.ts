import { Component, Input, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core'
import { Course } from '../model/course'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { CourseDialogComponent } from '../course-dialog/course-dialog.component'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit, OnDestroy {
  kill$: Subject<any> = new Subject()

  @Input()
  courses: Course[]

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  editCourse({ description, longDescription, category }: Course) {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: { description, longDescription, category }
    })

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.kill$))
      .subscribe(val => console.log('Dialog output:', val))
  }
}
