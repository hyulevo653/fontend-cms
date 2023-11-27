import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from 'src/app/routes/product-routing.module';
import { AddProductComponent } from './product/add-product/add-product.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        AppLayoutModule,
        ChartModule,
        ProductRoutingModule,
        MultiSelectModule
    ],
    declarations: [ProductComponent, AddProductComponent]
})
export class ProductModule { }
