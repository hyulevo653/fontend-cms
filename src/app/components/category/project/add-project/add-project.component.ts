import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';

import {FormGroup , FormBuilder ,Validators} from "@angular/forms";
import { ProjectService } from 'src/app/services/project.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/viewModels/project/project';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  public itemProject: Project;

  public fProject: FormGroup;

  public lstWard: any[];
  public lstProvince: any[];
  public lstDistrict: any[];

  public filterProvince: Paging;
  public filterWard: Paging;
  public filterDistrict: Paging;

  public loading = [false];

  constructor(
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly projectService: ProjectService,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.itemProject = new Project();

    this.filterProvince = new Object as Paging;

    this.filterWard = new Object as Paging;

    this.filterDistrict = new Object as Paging;

    this.lstProvince = [];
    this.lstWard = [];
    this.lstDistrict = [];

    this.fProject = fb.group({
      Name: ['' , Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(150)])],
      Code: ['' , Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      PersonContact: ['' , Validators.maxLength(150)],
      PhoneContact: ['' , Validators.compose([Validators.minLength(9), Validators.maxLength(12)])],
      ProvinceId: [null , ],
      DistrictId: [null , ],
      WardId: [null , ],
      FullAddress: ['' , ],
      Note: ['' , ]
    })
  }

  ngOnInit(): void {
    this.getListProvince();
  }

  onSubmit() {
    if (this.fProject.invalid) {
      return;
    }

    const reqData = Object.assign({}, this.fProject.value);
    
    this.loading[0] = true;
    this.projectService.createProject(reqData).subscribe((res: ResApi) => {
      this.loading[0] = false;
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.meta?.error_message || AppMessageResponse.CreatedSuccess });
        this.router.navigate(['/project/list']);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
    },
    () => {this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest }) },
    () => {this.loading[0] = false} 
    )
  }

  getListProvince() {
    this.commonService.getListProvinceByPaging(this.filterProvince)
    .subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.lstProvince = res.data;
      }
      else {
        this.lstProvince = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
      
    })
  }

  getListDistrict(event: any) {
    if (!event || event.value) {
      this.lstDistrict = [];
    }

    this.filterDistrict.query = `ProvinceId=${event.value}`;

    this.commonService.getListDistrictByPaging(this.filterDistrict)
    .subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.lstDistrict = res.data;
      }
      else {
        this.lstDistrict = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
      
    })
  }

  getListWard(event: any) {
    if (!event || event.value) {
      this.lstWard = [];
    }

    this.filterWard.query = `DistrictId=${event.value}`;

    this.commonService.getListWardByPaging(this.filterWard)
    .subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.lstWard = res.data;
      }
      else {
        this.lstWard = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
      
    })
  }

  onBack(event: Event) {
    let isShow = true;//this.layoutService.getIsShow();

    if (isShow) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: "Chưa hoàn tất thêm mới dự án, Bạn có muốn quay lại?",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate(['/project/list']);
        },
        reject: () => {
            return;
        }
      });
    } else {
      this.router.navigate(['/project/list']);
    }
  }
}
