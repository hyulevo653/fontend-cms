import { UserModule } from './../components/user/user.module';
import { AppLayoutComponent } from './../layout/app.layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DashboardModule } from '../components/dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      { path: 'user', loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)},
      { path: 'category', loadChildren: () => import('../components/category/category.module').then(m => m.CategoryModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
