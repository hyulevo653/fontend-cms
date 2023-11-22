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
                            // {
                            //     label: 'Tòa nhà',
                            //     icon: 'pi pi-fw pi-building',
                            //     routerLink: ['/category/tower/list']
                            // },
                            // {
                            //     label: 'Vị trí',
                            //     icon: 'pi pi-fw pi-map-marker',
                            //     routerLink: ['/category/address/list']
                            // },
                            // {
                            //     label: 'Tầng',
                            //     icon: 'pi pi-fw pi-lock',
                            //     routerLink: ['/category/floor/list']
                            // },
                            // {
                            //     label: 'Phòng ban',
                            //     icon: 'pi pi-fw pi-tags',
                            //     routerLink: ['/']
                            // },
                            // {
                            //     label: 'Chức vụ',
                            //     icon: 'pi pi-fw pi-exclamation-triangle',
                            //     routerLink: ['/']
                            // }
                        ] },
                    { 
                        label: 'Căn hộ', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/'] 
                    },
                ]
            },
        ];
    }
}
