import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { AppMessageResponse, AppStatusCode, discountType, promotionType } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { ToastModule } from 'primeng/toast';
import {FormGroup , FormBuilder ,Validators} from "@angular/forms";
import { ProjectService } from 'src/app/services/voucher.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/viewModels/project/project';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  public itemProject: Project;

  public fProject!: FormGroup;
  public currentDate = new Date();
  public lstpromotionType = promotionType;
  public lstdiscountType = discountType;

  public loading = [false];
  public id: any;
  data: any;

  constructor(
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly projectService: ProjectService,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router,
    
    private readonly route: ActivatedRoute,
  ) {
    this.itemProject = new Project();

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id){
      this.getProjectById(this.id)
    }
    this.fProject = this.fb.group({
      // id: [''],
      name: ['' , Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(150)])],
      promotionType: [''],
      discountType: ['' , Validators.maxLength(150)],
      discountRate: [''],
      startDate : [''],
      endDate : [''],
      maxTotalOrder: [''],
      minTotalOrder : [''],
      createDate : new Date(this.currentDate),
      lastUpdate : new Date(this.currentDate),
      description: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(300)])],
      specificSegment: [''],
      maxPerUserUse: [''],
      maxDistributedVoucher: [''],
    })
  }

  onSubmit() {
    if(this.fProject.invalid){
      // this.markAllAsDirty()
    }else{
      if(this.id == null) {
        // this.fProject.controls['id'].setValue(0);
        const reqData = Object.assign({}, this.fProject.value);
        reqData.maxTotalOrder = this.fProject.get('maxTotalOrder')?.value;
        this.loading[0] = true;
        this.projectService.createProject(reqData).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.CreatedSuccess });
              
              setTimeout(() => {this.onReturnPage('/category/project/list')}, 1000);
            } 
            else { 
          
              this.messageService.add({ severity: 'warn', summary: 'Warn', detail: res.message || AppMessageResponse.BadRequest });
            }
          },
          () => {
            this.loading[0] = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest });
          },
          () => {
            this.loading[0] = false;
          }
        );
      }else{
    
        const reqData = Object.assign({}, this.fProject.value);
        this.loading[0] = true;
        this.projectService.updatePromotion(this.id, reqData).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.UpdatedSuccess });
  
              setTimeout(() => {this.onReturnPage('/category/project/list')}, 1500);
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
            }
          },
          () => {
            this.loading[0] = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest });
          },
          () => {
            this.loading[0] = false;
          }
        );
      }
    }
  }
  
  // markAllAsDirty() {
  //   Object.keys(this.fProject.controls).forEach(key => {
  //     const control = this.fProject.get(key);
  //     if (control.enabled && control.invalid) {
  //       control.markAsDirty();
  //     }
  //   });
  // }

  onReturnPage(url: string) : void {
    this.router.navigate([url]);
  }

  getProjectById(id: number) {    
    if(this.id != 0) {
      this.projectService.getPromotionById(id).subscribe((res: ResApi) => {
        if(res.status == AppStatusCode.StatusCode200) {
          this.data = res.data;
          this.formGroup();
        }
        else {
          this.data = [];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
        }
      }) 
      this.data={...this.data}
    }else{
      this.data = []
    }
  }
  formGroup(){
    this.fProject = this.fb.group({
      id:  this.id,
      name: this.data.name,
      description: this.data.description,
      promotionType: this.data.promotionType,
      discountType: this.data.discountType,
      discountRate: this.data.discountRate,
      startDate: new Date(this.data.startDate),
      endDate : new Date(this.data.endDate),
      createDate: new Date(this.data.createDate),
      lastUpdate: this.currentDate,
      minTotalOrder: this.data.minTotalOrder,
      maxTotalOrder : this.data.maxValueDiscount,
      maxPerUserUse: this.data.maxPerUserUse,
      // specificSegment : this.data.maxDistributedVoucher,
      active : this.data.active,
      maxDistributedVoucher: this.data.maxDistributedVoucher,
    })

  }


  

  onBack(event: Event) {
    let isShow = true;//this.layoutService.getIsShow();

    if (isShow) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: "Chưa hoàn tất thêm mới Voucher, Bạn có muốn quay lại?",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate(['category/project/list']);
        },
        reject: () => {
            return;
        }
      });
    } else {
      this.router.navigate(['category/project/list']);
    }
  }
}
