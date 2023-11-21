import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { CategoryRoutingModule } from 'src/app/routes/category-routing.module';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';
import { ProjectService } from 'src/app/services/project.service';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { TowerComponent } from './tower/tower.component';
import { TowerUploadComponent } from './tower/tower-upload/tower-upload.component';
import { FloorComponent } from './floor/floor.component';
import { FloorUploadComponent } from './floor/floor-upload/floor-upload.component';
import { AddFloorComponent } from './floor/add-floor/add-floor.component';
import { AddTowerComponent } from './tower/add-tower/add-tower.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { AddressUploadComponent } from './address/address-upload/address-upload.component';


@NgModule({
declarations: [
    ProjectComponent,
    TowerComponent,
    AddProjectComponent,
    TowerUploadComponent,
    FloorComponent,
    FloorUploadComponent,
    AddFloorComponent,
    AddTowerComponent,
    AddressComponent,
    AddAddressComponent,
    AddressUploadComponent
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
