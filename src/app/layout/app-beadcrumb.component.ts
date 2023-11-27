import { MenuItem } from 'primeng/api';
import { Component } from '@angular/core';

@Component({
  selector: 'app-app-beadcrumb',
  templateUrl: './app-beadcrumb.component.html'
})
export class AppBeadcrumbComponent {
  public items: MenuItem[];

  public home: MenuItem;

  constructor() {
    this.items = new Array();
    this.home = {} as MenuItem;;
  }

  ngOnInit() {
      // this.items = [{ label: 'Quản lý danh mục' }, { label: 'Khu đô thị' }];

      this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
