import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCategoryComponent} from './pages/admin/add-category/add-category.component';
import {AddQuestionComponent} from './pages/admin/add-question/add-question.component';
import {AddQuizComponent} from './pages/admin/add-quiz/add-quiz.component';

import {DashboardComponent} from './pages/admin/dashboard/dashboard.component';
import {UpdateQuizComponent} from './pages/admin/update-quiz/update-quiz.component';
import {ViewCategoriesComponent} from './pages/admin/view-categories/view-categories.component';
import {ViewQuizQuestionsComponent} from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import {ViewQuizzesComponent} from './pages/admin/view-quizzes/view-quizzes.component';
import {WelcomeComponent} from './pages/admin/welcome/welcome.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';
import {InstructionsComponent} from './pages/user/instructions/instructions.component';
import {LoadQuizComponent} from './pages/user/load-quiz/load-quiz.component';
import {StartComponent} from './pages/user/start/start.component';
import {UserDashboardComponent} from './pages/user/user-dashboard/user-dashboard.component';
import {AdminGuard} from './services/admin.guard';
import {NormalGuard} from './services/normal.guard';
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {CantactUsComponent} from "./components/cantact-us/cantact-us.component";
import {DonationComponent} from "./components/donation/donation.component";
import {NewsLetterComponent} from "./components/news-letter/news-letter.component";
import {VerificationComponent} from "./pages/verification/verification.component";
import {ForgotPasswordComponent} from './pages/user/forgot-password/forgot-password.component';
import {QuizAttemptHistoryComponent} from './pages/admin/quiz-attempt-history/quiz-attempt-history.component';
import {SelectSubjectComponent} from './pages/user/select-subject/select-subject.component';
import {PaymentComponent} from "./components/payment/payment.component";
import {ChangePasswordComponent} from "./pages/user/change-password/change-password.component";
import {ChangeEmailComponent} from "./pages/user/change-email/change-email.component";
import {AuthGuard} from "./services/auth.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full',
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    pathMatch: 'full'
  },
  {
    path: 'payment-plans',
    component: PaymentComponent,
    pathMatch: 'full'
  },
  {
    path: 'donation',
    component: DonationComponent,
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: NewsLetterComponent,
    pathMatch: 'full'
  },
  {
    path: 'verify/:email',
    component: VerificationComponent,
  },
  {
    path: 'contact-us',
    component: CantactUsComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'attempts-history/:qid',
        component: QuizAttemptHistoryComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-question/:qid/:title/:category',
        component: AddQuestionComponent,
      },
    ],
  },
  {
    path: 'select-subject',
    component: SelectSubjectComponent,
  },
  {
    path: 'specific-action',
    component: SelectSubjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
  {
    path: 'instructions/:qid',
    component: InstructionsComponent,
    canActivate: [NormalGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [NormalGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'change-email',
    component: ChangeEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
