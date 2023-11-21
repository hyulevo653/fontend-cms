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
    path: 'project/create/:projectId',
    component: AddProjectComponent
  },
  {
    path: 'tower/list',
    component: TowerComponent
  },
  {
    path: 'tower/create/:towerId',
    component: AddTowerComponent
  },
  {
    path: 'tower/upload',
    component: TowerUploadComponent
  },
  {
    path: 'floor/list',
    component: FloorComponent
  },
  {
    path: 'floor/create/:floorId',
    component: AddFloorComponent
  },
  {
    path: 'floor/upload',
    component: FloorUploadComponent
  },
  {
    path: 'address/list',
    component: AddressComponent
  },
  {
    path: 'address/create/:Code',
    component: AddAddressComponent
  },
  {
    path: 'promotion/list',
    component: AddressComponent
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
