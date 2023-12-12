import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { CategoryRoutingModule } from 'src/app/routes/category-routing.module';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';
import { ProjectService } from 'src/app/services/voucher.service';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoriesComponent } from './categories/add-categories/add-categories.component';
import { TestComponent } from './test/test.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { CampaignComponent } from './campaign/campaign.component';
import { AddCampaignComponent } from './campaign/add-campaign/add-campaign.component';
import { SlideComponent } from './slide/slide.component';
import { AddSlideComponent } from './slide/add-slide/add-slide.component';


@NgModule({
declarations: [
    ProjectComponent,
    AddProjectComponent,
    CategoriesComponent,
    AddCategoriesComponent,
    TestComponent,
    OrderComponent,
    AddOrderComponent,
    CampaignComponent,
    AddCampaignComponent,
    SlideComponent,
    AddSlideComponent,
  ],
  imports: [
    CommonModule,
    AppLayoutModule,
    CategoryRoutingModule,
    
  ],
  providers: [
    ProjectService
  ]
})
export class CategoryModule { }
