import { UserModule } from './../components/user/user.module';
import { AppLayoutComponent } from './../layout/app.layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DashboardModule } from '../components/dashboard/dashboard.module';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent
      },
      { path: 'user', loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)},
      { path: 'category', loadChildren: () => import('../components/category/category.module').then(m => m.CategoryModule)},
      { path: 'manager-product', loadChildren: () => import('../components/manage-products/product.module').then(m => m.ProductModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
