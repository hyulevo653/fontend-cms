import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Floor } from 'src/app/viewModels/floor/floor';
import { FloorService } from 'src/app/services/floor.service';
import { TowerService } from 'src/app/services/tower.service';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.scss']
})
export class AddFloorComponent {

  floor: Floor;
  public itemFloor: Floor;

  public id: any;
   fFloor: any ;

  public lstProjectName: any[];
  public lstTower: any[];
  public lstFloor: any;


  public filterFloor: Paging;
  public filterProjectName: Paging;
  public filterTower: Paging;

  public filterParrams : Paging ;

  public loading = [false];

  constructor(
    private readonly projectService: ProjectService,
    private readonly towerService: TowerService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly floorService: FloorService,
    private readonly route: ActivatedRoute,
    
  ) {
    this.floor = new Floor();
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.page_size = 10;
    this.itemFloor = new Floor();

    this.filterFloor = new Object as Paging;

    this.filterProjectName = new Object as Paging;
    this.filterTower = new Object as Paging;

    this.lstProjectName = [];
    this.lstTower = [];
    this.lstFloor = {};

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('floorId');
      console.log(this.id);
    });
   
    
    this.getListProjectName()
    this.getListTower()
    if(this.id)
      this.getFloorById(this.id);

      this.fFloor = this.fb.group({
        ProjectId:  ['' , [Validators.required]],
        TowerId: ['' , [Validators.required]],
        Address: ['' , [Validators.required]],
        Code: ['' , [Validators.required]],
        Name: ['' , [Validators.required]],
        Note: ['' ],
      });
    }

  onSubmit() {
    if (this.fFloor.invalid) {
      return;
    }

    const reqData = Object.assign({}, this.fFloor.value);
    
    this.loading[0] = true;
    this.floorService.createFloor(reqData).subscribe((res: ResApi) => {
      this.loading[0] = false;
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.meta?.error_message || AppMessageResponse.CreatedSuccess });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
    },
    () => {this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest }) },
    () => {this.loading[0] = false} 
    )
  }

  formGroup() {
    this.fFloor = this.fb.group({
      ProjectId:  [this.id? this.lstFloor.ProjectName:undefined , [Validators.required]],
      TowerId: [this.id? this.lstFloor.TowerName:undefined , [Validators.required]],
      Address: [this.id? this.lstFloor.Address:undefined , [Validators.required]],
      Code: [this.id? this.lstFloor.Code:undefined , [Validators.required]],
      Name: [this.id? this.lstFloor.Name:undefined , [Validators.required]],
      Note: [this.id? this.lstFloor.Note:undefined ],
    }); 
  }

  getFloorById(id: number) {
    let filterById: Paging =  new Object as Paging;
    filterById.query =  `Code=${id}`;
    this.floorService.getListFloorByPaging(filterById).subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.lstFloor = res.data[0];
        this.formGroup();
      }
      else {
        this.lstFloor = new Array<Floor>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
      
    }) 
    this.lstFloor={...this.lstFloor}
    console.log(this.lstFloor);

  }

  btn() {
    console.log(this.lstFloor);
    console.log(this.lstProjectName);
    
  }
  getListProjectName() {
    let filterProjectName: Paging =  new Object as Paging;
    this.lstProjectName = [];
    this.projectService.getListByPaging(this.filterProjectName).subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.lstProjectName = res.data;
      }
      else {
        this.lstFloor  = new Array<Floor>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
    })  
  }
  getListTower() {
    let filterProjectName: Paging =  new Object as Paging;
    this.lstTower = [];
    this.towerService.getListTowerByPaging(this.filterProjectName).subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.lstTower = res.data;
      }
      else {
        this.lstFloor  = new Array<Floor>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
    })  
  }
}
