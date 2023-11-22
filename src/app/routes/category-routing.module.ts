import { ProjectComponent } from './../components/category/project/project.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from '../components/category/project/add-project/add-project.component';
import { TowerComponent } from '../components/category/tower/tower.component';
import { TowerUploadComponent } from '../components/category/tower/tower-upload/tower-upload.component';
import { FloorComponent } from '../components/category/floor/floor.component';
import { AddFloorComponent } from '../components/category/floor/add-floor/add-floor.component';
import { FloorUploadComponent } from '../components/category/floor/floor-upload/floor-upload.component';
import { AddTowerComponent } from '../components/category/tower/add-tower/add-tower.component';
import { AddressComponent } from '../components/category/address/address.component';
import { AddAddressComponent } from '../components/category/address/add-address/add-address.component';



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
