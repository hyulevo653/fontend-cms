import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    items!: MenuItem[];
    menuItems: MenuItem[] = [];
    public currentDate = new Date();
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('topbarmenutime') topbarmenutime!: ElementRef;
    Idc: any;
    userId: any;
    dataUser: any;
    public Fullname = '';
    UserName: any;
    getDate: any;
    getDay: any;
    getMonth: any;
    getFullYear: any;
    nameDay: string = '';   
    Avata: any;

    constructor(
        public layoutService: LayoutService,
        private readonly cookieService: CookieService,
        private router : Router,
    ) 
    {
        this.getDate = new Date().getDate();
        this.getDay = new Date().getDay();
        this.getMonth = new Date().getUTCMonth() + 1;
        this.getFullYear = new Date().getFullYear();
        if (this.getDay == 0) {
          this.nameDay = 'Chủ nhật';
        } else if (this.getDay == 1) {
          this.nameDay = 'Thứ hai';
        } else if (this.getDay == 2) {
          this.nameDay = 'Thứ ba';
        } else if (this.getDay == 3) {
          this.nameDay = 'Thứ tư';
        } else if (this.getDay == 4) {
          this.nameDay = 'Thứ năm';
        } else if (this.getDay == 5) {
          this.nameDay = 'Thứ sáu';
        } else if (this.getDay == 6) {
          this.nameDay = 'Thứ bảy';
        }
    }
    ngOnInit() : void{
        setInterval(() => {
            this.currentDate = new Date();
          }, 1000);
    }

    logout(){
        this.cookieService.delete('accessToken');
        this.router.navigate(['/auth/login']);
      }
}
