import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { TowerService } from 'src/app/services/tower.service';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';
import { DbTower } from 'src/app/viewModels/tower/db-tower';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-tower',
  templateUrl: './add-tower.component.html',
  styleUrls: ['./add-tower.component.scss']
})
export class AddTowerComponent implements OnInit {

  tower: DbTower;
  public itemTower: DbTower;

  public towerId: any;
   fTower: any ;

  public lstWard: any[];
  public lstTower: any[];
  public lstProjectName: any[];
  public dataProject: any;


  public filterTower: Paging;
  public filterWard: Paging;
  public filterProjectName: Paging;

  public filterParrams : Paging ;

  public loading = [false];

  constructor(
    private readonly projectService: ProjectService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly towerService: TowerService,
    private readonly route: ActivatedRoute,
    
  ) {
    this.tower = new DbTower();
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.page_size = 10;
    this.itemTower = new DbTower();

    this.filterTower = new Object as Paging;

    this.filterWard = new Object as Paging;

    this.filterProjectName = new Object as Paging;

    this.lstTower = [];
    this.lstWard = [];
    this.lstProjectName = [];
    this.dataProject = {};

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.towerId =  params.get('towerId');
    });
    this.getListProjectName()
    this.formGroup();
    if(this.towerId)
      this.getTowersById(this.towerId);
    console.log(this.dataProject);

    this.fTower = this.fb.group({
      ProjectName: ['' , [Validators.required]],
      ProjectID: ['' , [Validators.required]],

      TowerId: ['' , [Validators.required]],

      Code: ['' , [Validators.required]],

      Name: ['' , [Validators.required]],
      PhoneContact: [''],
      PersonContact: [''],
      Note: [''],
    })

  }

  onSubmit() {
    if (this.fTower.invalid) {
      return;
    }

    const reqData = Object.assign({}, this.fTower.value);
    
    this.loading[0] = true;
    this.towerService.createTower(reqData).subscribe((res: ResApi) => {
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
  formGroup(){
    this.fTower = this.fb.group({
      ProjectName: [this.towerId? this.dataProject.ProjectName:undefined , [Validators.required]],
      ProjectID: [this.towerId? this.dataProject.ProjectID:undefined , [Validators.required]],

      TowerId: [this.towerId? this.dataProject.TowerId:undefined , [Validators.required]],

      Code: [this.towerId? this.dataProject.Code:undefined , [Validators.required]],

      Name: [this.towerId? this.dataProject.Name:undefined , [Validators.required]],
      PhoneContact: [this.towerId? this.dataProject.PhoneContact:undefined],
      PersonContact: [this.towerId? this.dataProject.PersonContact:undefined ],
      Note: [this.towerId? this.dataProject.Note:undefined ],
    })
  }

  getTowersById(id: number) {
    let filterById: Paging =  new Object as Paging;
    filterById.query =  `TowerId=${id}`;
    this.towerService.getListTowerByPaging(filterById).subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.dataProject = res.data[0];
        
        this.formGroup();
      }
      else {
        this.dataProject = new Array<DbTower>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
      
    }) 
    this.dataProject={...this.dataProject}
    console.log(this.dataProject);

  }

  btn() {
    console.log(this.dataProject);
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
        this.dataProject = new Array<DbTower>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
    })  
  }
}
