import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { FloorService } from 'src/app/services/floor.service';
import { ProjectService } from 'src/app/services/project.service';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { Floor } from 'src/app/viewModels/floor/floor';
import { Project } from 'src/app/viewModels/project/project';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent {
  public filterParrams : Paging ;
  public lstFloor!: Array<Floor>;
  public first = 0;
  public rows = 10;

  data = [];
  searchText: string | undefined;
  public selectedProjectId: number | undefined;
  public itemFloor: Floor;

  public fTower: FormGroup ;
  public fSearch: FormGroup ;

  public lstWard: any[];
  public lstTower: [];
  public lstProject: Array<Project>;

  public filterTower: Paging;
  public filterWard: Paging;
  public filterProject: Paging;

  public loading = [false];

  positions = [];
  departments = [];
  

  constructor(
    private readonly floorService: FloorService,
    private readonly projectService: ProjectService,
    private readonly messageService: MessageService,
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
    //private readonly customerService: CustomerService
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.page_size = 100;

    this.lstFloor = new Array<Floor>();
    this.itemFloor = new Floor();

    this.filterTower = new Object as Paging;

    this.filterWard = new Object as Paging;

    this.filterProject = new Object as Paging;

    this.lstTower = [];
    this.lstWard = [];
    this.lstProject = [];

    this.fTower = fb.group({
      ProjectName: ['' , Validators.required],
      Code: ['' , Validators.required],
      Name: ['' , Validators.required],
      TowerName: ['' , Validators.required],
      Address: ['' ,],
      Note: ['' , ]
    })

    this.fSearch = fb.group({
      ProjectId: [''],
      TowerId: [''],
      Address: [''],
    })
  }

  ngOnInit() {
    this.getListFloorByPaging();
    this.getListProject();
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
getListFloorByPaging() {
  this.floorService.getListFloorByPaging(this.filterParrams).subscribe((res: ResApi) => {
    if(res.meta.error_code == AppStatusCode.StatusCode200) {
      this.lstFloor = res.data;
    }
    else {
      this.lstFloor = new Array<Floor>();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
    }
    
  })
}
getListProject() {
  this.lstProject = [];
  this.projectService.getListByPaging(this.filterProject).subscribe((res: ResApi) => {
    if(res.meta.error_code == AppStatusCode.StatusCode200) {
      this.lstProject = res.data;
    }
    else {
      this.lstProject = [];
      this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
    }
  })  
}
  deleteTower(itemFloor: Floor) {

  }

  openDialogModel(event: any) {
    // const dialogRef = this.modalService.open(TowerUploadComponent);

  }
  onSelect(event: any) {
    console.log(event);
    
    if(event != null){
      this.filterParrams.query = `ProjectId=${event.value}`;
      this.getListFloorByPaging();
    } else{
      this.filterParrams.query = '1=1';
      this.getListFloorByPaging();
    }
    
  }
  onSelectTower(event: any) {
    if(event == null){
      this.filterParrams.query = '1=1';
      this.getListFloorByPaging();
    } else{
      this.filterParrams.query = `TowerId=${event.value}`;
    }
    this.getListFloorByPaging();
  }
}
