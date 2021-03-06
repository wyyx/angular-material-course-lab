import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { MatTabsModule } from '@angular/material/tabs'
import { TopMenuComponent } from './top-menu/top-menu.component'
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { CourseComponent } from './course/course.component'
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material'
import { CoursesService } from './services/courses.service'
import { CourseResolver } from './services/course.resolver'
import { HttpClientModule } from '@angular/common/http'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { CourseDialogComponent } from './course-dialog/course-dialog.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatMomentDateModule } from '@angular/material-moment-adapter'

MatMomentDateModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopMenuComponent,
    CoursesCardListComponent,
    CourseComponent,
    CourseDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule
  ],
  providers: [CoursesService, CourseResolver],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent]
})
export class AppModule {}
