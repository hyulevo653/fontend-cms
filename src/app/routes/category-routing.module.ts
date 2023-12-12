import { ProjectComponent } from './../components/category/project/project.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from '../components/category/project/add-project/add-project.component';
import { CategoriesComponent } from '../components/category/categories/categories.component';
import { AddCategoriesComponent } from '../components/category/categories/add-categories/add-categories.component';
import { TestComponent } from '../components/category/test/test.component';
import { OrderComponent } from '../components/category/order/order.component';
import { AddOrderComponent } from '../components/category/order/add-order/add-order.component';
import { CampaignComponent } from '../components/category/campaign/campaign.component';
import { AddCampaignComponent } from '../components/category/campaign/add-campaign/add-campaign.component';
import { SlideComponent } from '../components/category/slide/slide.component';
import { AddSlideComponent } from '../components/category/slide/add-slide/add-slide.component';



const routes: Routes = [
  {
    path: 'project/list',
    component: ProjectComponent,
  },
  {
    path: 'project/create',
    component: AddProjectComponent,
  },
  {
    path: 'project/upload/:id',
    component: AddProjectComponent,
  },
  {
    path: 'categories/list',
    component: CategoriesComponent,
  },
  {
    path: 'categories/create',
    component: AddCategoriesComponent,
  },
  {
    path: 'categories/upload/:id',
    component: AddCategoriesComponent,
  },
  {
    path: 'order/list',
    component: OrderComponent,
  },
  {
    path: 'order/view-detail/:id',
    component: AddOrderComponent,
  },
  {
    path: 'campaign/list',
    component: CampaignComponent,
  },
  {
    path: 'campaign/create',
    component: AddCampaignComponent,
  },
  {
    path: 'campaign/upload/:id',
    component: AddCampaignComponent,
  },
  {
    path: 'slide/list',
    component: SlideComponent,
  },
  {
    path: 'slide/create',
    component: AddSlideComponent,
  },
  {
    path: 'slide/upload/:id',
    component: AddSlideComponent,
  },
  // {
  //   path: 'categories/test/list',
  //   component: TestComponent,
  // },
  
  // {
  //   path: 'project/detail/:proId',
  //   component: AddProjectComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
