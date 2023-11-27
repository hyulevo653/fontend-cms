import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../components/manage-products/product/product.component';
import { AddProductComponent } from '../components/manage-products/product/add-product/add-product.component';



const routes: Routes = [
  {
    path: 'product/list',
    component: ProductComponent,
  },
  {
    path: 'product/create',
    component: AddProductComponent,
  },
  {
    path: 'product/upload/:id',
    component: AddProductComponent,
  },
 
  // {
  //   path: 'project/detail/:proId',
  //   component: AddProjectComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
