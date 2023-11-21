import { Component, OnInit } from '@angular/core';
import { DbTower } from 'src/app/viewModels/tower/db-tower';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paging } from 'src/app/viewModels/paging';
import { TowerService } from 'src/app/services/tower.service';
import { ResApi } from 'src/app/viewModels/res-api';
import { MessageService } from 'primeng/api';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TowerUploadComponent } from './tower-upload/tower-upload.component';


@Component({
  selector: 'app-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.scss']
})
export class TowerComponent implements OnInit {
  public filterParrams : Paging ;
  public Towers!: Array<DbTower>;
  public first = 0;
  public rows = 10;
  searchTower: string | undefined;

  data = [];
  public itemTower: DbTower;

  public fTower: FormGroup ;

  public lstTower: any[];

  public filterTower: Paging;
  public filterWard: Paging;
  public filterProjectName: Paging;

  public loading = [false];

  positions = [];
  departments = [];

  constructor(
    private readonly towerService: TowerService,
    private readonly messageService: MessageService,
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    //private readonly customerService: CustomerService
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.page_size = 10;

    this.Towers = new Array<DbTower>();
    this.itemTower = new DbTower();

    this.filterTower = new Object as Paging;

    this.filterWard = new Object as Paging;

    this.filterProjectName = new Object as Paging;

    this.lstTower = [];

    this.fTower = fb.group({
      ProjectName: ['' , Validators.required],
      TowerId: ['' , Validators.required],
      Name: ['' , Validators.required],
      PhoneContact: ['' , Validators.required],
      PersonContact: [null , ],
      Note: ['' , ]
    })
  }

  ngOnInit() {
    this.getListTowersByPaging();
}

  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return true;//this.customers ? this.first === this.customers.length - this.rows : true;
}

isFirstPage(): boolean {
    return true;//this.customers ? this.first === 0 : true;
}
getListTowersByPaging() {
  this.towerService.getListTowerByPaging(this.filterParrams).subscribe((res: ResApi) => {
    if(res.meta.error_code == AppStatusCode.StatusCode200) {
      this.Towers = res.data;
    }
    else {
      this.Towers = new Array<DbTower>();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
    }
    
  })
}
  deleteTower(itemTower: DbTower) {

  }
  onSearch(event: any) {
    console.log(event.searchTower);
    
    if (event == null) {
      this.filterParrams.query = '1=1';
    } else {
      let query = '';
      if (event.searchTerm) {
        query += `Name=${event.searchTerm}`;
      }
      if (event.searchTower) {
        if (query !== '') {
          query += ',';
        }
        query += `TowerId=${event.searchTower}`;
      }
      this.filterParrams.query = query;
    }
    this.getListTowersByPaging();
  }

}

