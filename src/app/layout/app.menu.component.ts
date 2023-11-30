import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'CHỨC NĂNG',
                items: [
                    { 
                        label: 'Quản lý chức năng', 
                        icon: 'pi pi-fw pi-th-large', 
                        items: [
                            {
                                label: 'Quản lý Voucher',
                                icon: 'pi pi-fw pi-flag',
                                routerLink: ['/category/project/list']
                            },
                            {
                                label: 'Quản lý Category',
                                icon: 'pi pi-fw pi-flag',
                                routerLink: ['/category/categories/list']
                            },
                            {
                                label: 'Quản lý đơn đặt hàng',
                                icon: 'pi pi-fw pi-flag',
                                routerLink: ['/category/order/list']
                            },
                            // {
                            //     label: 'Test',
                            //     icon: 'pi pi-fw pi-flag',
                            //     routerLink: ['/category/categories/test/list']
                            // },
                            // {
                        ] },
                    { 
                        label: 'Sản phẩm', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/manager-product/product/list'] 
                    },
                    { 
                        label: 'Campaign', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/category/campaign/list'] 
                    },
                ]
            },
        ];
    }
}
