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
                label: 'Danh mục & nhân viên',
                items: [
                    { 
                        label: 'Quản lý danh mục', 
                        icon: 'pi pi-fw pi-th-large', 
                        items: [
                            {
                                label: 'Khu đô thị',
                                icon: 'pi pi-fw pi-flag',
                                routerLink: ['/category/project/list']
                            },
                            {
                                label: 'Tòa nhà',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/category/tower/list']
                            },
                            {
                                label: 'Vị trí',
                                icon: 'pi pi-fw pi-map-marker',
                                routerLink: ['/category/address/list']
                            },
                            {
                                label: 'Tầng',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/category/floor/list']
                            },
                            {
                                label: 'Phòng ban',
                                icon: 'pi pi-fw pi-tags',
                                routerLink: ['/']
                            },
                            {
                                label: 'Chức vụ',
                                icon: 'pi pi-fw pi-exclamation-triangle',
                                routerLink: ['/']
                            }
                        ] },
                    { 
                        label: 'Căn hộ', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/'] },
                    { 
                        label: 'Cư dân', 
                        icon: 'pi pi-fw pi-users', 
                        routerLink: ['/'] },
                    { 
                        label: 'Nhân viên', 
                        icon: 'pi pi-fw pi-user', 
                        routerLink: ['/'] 
                    },
                    { 
                        label: 'Tài liệu', 
                        icon: 'pi pi-fw pi-box', 
                        routerLink: ['/']
                    }
                ]
            },
            {
                label: 'Tiện ích & dịch vụ',
                items: [
                    { 
                        label: 'Thẻ', 
                        icon: 'pi pi-fw pi-book',
                        badge: 'NEW',
                        items: [
                            {
                                label: 'Quản lý kho thẻ',
                                icon: 'pi pi-fw pi-database',
                                routerLink: ['/']
                            }
                        ]
                    },
                    { 
                        label: 'Tiện ích', 
                        icon: 'pi pi-fw pi-share-alt', 
                        items: [
                            {
                                label: 'Đăng ký khóa/hủy thẻ',
                                icon: 'pi pi-fw pi-unlock',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Đăng ký cư dân về ở',
                                icon: 'pi pi-fw pi-window-maximize',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Đăng ký chuyển hàng hóa vào/ra',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Đăng ký thi công',
                                icon: 'pi pi-fw pi-prime',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Đăng ký thuê sân BBQ',
                                icon: 'pi pi-fw pi-flag',
                                routerLink: ['/auth/login']
                            }
                        ]
                    },
                    { 
                        label: 'Yêu cầu hỗ trợ', 
                        icon: 'pi pi-fw pi-flag',
                        badge: 'NEW',
                        routerLink: ['/auth/login']
                    },
                ]
            },
            { 
                label: 'Quản lý', 
                items: [
                    { 
                        label: 'Quản lý ra/vào', 
                        icon: 'pi pi-fw pi-external-link',
                        badge: '1',
                        routerLink: ['/auth/login']
                    },
                    { 
                        label: 'Công việc', 
                        icon: 'pi pi-fw pi-calendar-minus',
                        badge: '1',
                        routerLink: ['/auth/login']
                    },
                ]
            },
            {
                label: 'Tính phí & thanh toán',
                items: [
                    { label: 'Tính phí', icon: 'pi pi-fw pi-print', routerLink: ['/utilities/icons'], target: '_blank' },
                    { label: 'Thanh toán', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/primeflex/'] },
                ]
            },
            {
                label: 'Tin tức & thông báo',
                items: [
                    { 
                        label: 'Thông báo', 
                        icon: 'pi pi-fw pi-bell',
                        badge: '1',
                        routerLink: ['/auth/login']
                    },
                    { 
                        label: 'Tin tức cư dân', 
                        icon: 'pi pi-fw pi-sync',
                        badge: '1',
                        items: [
                            { 
                                label: 'Bảng tin cư dân', 
                                icon: 'pi pi-fw pi-volume-off',
                                badge: '1',
                                routerLink: ['/auth/login']
                            },
                            { 
                                label: 'Sổ tay cư dân', 
                                icon: 'pi pi-fw pi-volume-off',
                                badge: '1',
                                routerLink: ['/auth/login']
                            },
                            { 
                                label: 'Danh bạ khu dân cư', 
                                icon: 'pi pi-fw pi-volume-off',
                                badge: '1',
                                routerLink: ['/auth/login']
                            },
                            { 
                                label: 'Tin quảng cáo', 
                                icon: 'pi pi-fw pi-volume-off',
                                badge: '1',
                                routerLink: ['/auth/login']
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Cấu hình & phân quyền',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Cấu hình',
                        icon: 'pi pi-fw pi-globe',
                        items: [
                            {
                                label: 'Chức năng',
                                icon: 'pi pi-fw pi-slack',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Tiện ích đối tác',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Thẻ',
                                icon: 'pi pi-fw pi-credit-card',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Thanh toán',
                                icon: 'pi pi-fw pi-shopping-cart',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Carparking & access controls',
                                icon: 'pi pi-fw pi-car',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Phân quyền',
                        icon: 'pi pi-fw pi-user-edit',
                        items: [
                            {
                                label: 'Ban quản lý',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Ban quản trị',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Chủ đầu tư',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
