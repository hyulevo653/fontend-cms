import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CommonService } from 'src/app/services/common.service';
import { AppMessageResponse, AppStatusCode, StatusCampaign, TypeWhen, channelCampaign, qualification } from 'src/app/shared/constants/app.constants';
import { Campaign } from 'src/app/viewModels/campaign/campaign';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent {
  lstQualification = qualification;
  lstStatus = StatusCampaign;
  lstChanel = channelCampaign;
  lstTypewhen = TypeWhen;
  public itemProject: Campaign;
  who : any;
  what : any;
  when: any;
  public fCampaign!: FormGroup;
  public currentDate = new Date();

  public loading = [false];
  public id: any;
  data: any;

  constructor(
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly campaignService: CampaignService,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router,
    
    private readonly route: ActivatedRoute,
  ) {
    this.itemProject = new Campaign();

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id){
      this.getProjectById(this.id)
    }
    this.fCampaign = this.fb.group({
      name: ['',Validators.required],
      qualification: [''],
      who: this.fb.group({
        eventName: [''],
        eventProperty: [''],
        value: [''],
        isAllUser: [true],
      }),
      what: this.fb.group({
        title: [''],
        message: [''],
        timeToLive: [''],
        imageUrl: [''],
        iconUrl: [''],
        background: [''],
        deeplink: [''],
        customKeyValue: this.fb.group({
          value: [''],
        }),
      }),
      when: this.fb.group({
        type: [''],
        repeat: [''],
        endDate: [null],
      }),
      status: [''],
      channel: [''],
    });
    // this.fCampaign = this.fb.group({
    //   // id: [''],
    //   name: ['' , Validators.required],
    //   qualification: [''],
    //   who: [],
    //   what: [],
    //   when : [],
    //   status : [''],
    //   channel: [''],
    // })
  }

  onSubmit() {
    if(this.fCampaign.invalid){
      // this.markAllAsDirty()
    }else{
      if(this.id == null) {
        // this.fCampaign.controls['id'].setValue(0);
        const reqData = Object.assign({}, this.fCampaign.value);
        this.loading[0] = true;
        this.campaignService.createCampaign(reqData).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.CreatedSuccess });
              
              setTimeout(() => {this.onReturnPage('/category/campaign/list')}, 1000);
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
    
        const reqData = Object.assign({}, this.fCampaign.value);
        this.loading[0] = true;
        this.campaignService.updateCampaign(this.id, reqData).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.UpdatedSuccess });
  
              setTimeout(() => {this.onReturnPage('/category/campaign/list')}, 1500);
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
  //   Object.keys(this.fCampaign.controls).forEach(key => {
  //     const control = this.fCampaign.get(key);
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
      this.campaignService.getCampaignById(id).subscribe((res: ResApi) => {
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
    this.fCampaign = this.fb.group({
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
      active : this.data.active,
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
