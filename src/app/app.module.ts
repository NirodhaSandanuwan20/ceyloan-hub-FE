import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SidebarComponent as UserSidebar } from './pages/user/sidebar/sidebar.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import {DialogContentComponent, StartComponent} from './pages/user/start/start.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRadioModule} from "@angular/material/radio";
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CantactUsComponent } from './components/cantact-us/cantact-us.component';
import { DonationComponent } from './components/donation/donation.component';
import { NewsLetterComponent } from './components/news-letter/news-letter.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { FilterLevelPipe } from './pages/user/sidebar/filter-level.pipe';
import { FilterSubjectPipe } from './pages/profile/filter-subject.pipe';
import { QuizAttemptHistoryComponent } from './pages/admin/quiz-attempt-history/quiz-attempt-history.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SelectSubjectComponent } from './pages/user/select-subject/select-subject.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PaymentComponent } from './components/payment/payment.component';
import { TodoListComponent } from './pages/user/todo-list/todo-list.component';
import { ChangePasswordComponent } from './pages/user/change-password/change-password.component';
import { ChangeEmailComponent } from './pages/user/change-email/change-email.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { WatchComponent } from './pages/watch/watch.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    DialogContentComponent,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    UserSidebar,
    LoadQuizComponent,
    InstructionsComponent,
    StartComponent,
    AboutUsComponent,
    CantactUsComponent,
    DonationComponent,
    NewsLetterComponent,
    VerificationComponent,
    ForgotPasswordComponent,
    FilterLevelPipe,
    FilterSubjectPipe,
    QuizAttemptHistoryComponent,
    SelectSubjectComponent,
    PaymentComponent,
    TodoListComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    WatchComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    CKEditorModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    MatGridListModule,
    MatRadioModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatExpansionModule,
    MatStepperModule,
    MatTooltipModule,
    MatDialogModule,
    MatRippleModule
  ],
  providers: [authInterceptorProviders,FilterSubjectPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
