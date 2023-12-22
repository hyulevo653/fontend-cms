import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CommonService } from 'src/app/services/common.service';
import { AppMessageResponse, AppStatusCode, Count, StatusCampaign, TypeCombine, TypeCombineUser, TypeCondition, TypeWhen, ValueSlide, channelCampaign, qualification } from 'src/app/shared/constants/app.constants';
import { Campaign } from 'src/app/viewModels/campaign/campaign';
import { Paging } from 'src/app/viewModels/paging';
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
  lstTypeCompare = TypeCombine;
  lstTypeCompareUser = TypeCombineUser;
  valueData: any;
  selectedDatesList: string[] = [];
  lstStartdate: any;
  lstCount = Count;
  lstTypeCondition = TypeCondition;
  lstValue = ValueSlide;
  liveEventVisible: boolean = false;
  slideValue : any;
  valueUsernotDid: any;
  valueUserDid: any;
  typeWhen:any;
  lstEventname: any;
  lstProperty : any;
  evenNamevalue: any;
  public isAllUser : boolean = false;
  public isCheck : boolean  = false;

  uploadedImages: string[] = [];
  uploadedImages2: string[] = [];
  uploadedImages3: string[] = [];
  lstValues: any;
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
    private http : HttpClient,
    
    private readonly route: ActivatedRoute,
  ) {
    this.itemProject = new Campaign();
    this.lstStartdate = []
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    this.getEvent();
    if(this.id){
      this.getProjectById(this.id)
    }
  
    
    // const formattedDates = dateStrings.map(dateString => {
    //   const dateObject = new Date(dateString);
    //   const formattedDate = dateObject.toLocaleString(); 
    //   return formattedDate;
    // });
    
    this.fCampaign = this.fb.group({
      name: ['',Validators.required],
      qualification: [''],
      channel: [''],
      forAll : [false],
      who: this.fb.group({
        typeCombine: ['AND'],
        liveEvent: this.fb.group({
          eventName: [''],
          eventProperty: [''],
          value: this.fb.array([]),
        }),
        userDid: this.fb.group({
          eventName: [''],
          eventProperty: [''],
          value: this.fb.array([]),
          typeCompare: ['EQUALS'],
          count: [5],
          typeCondition: ['EQUALS'],
          startTime: [this.calculateDefaultStartDate(),[]],
          endTime: [this.calculateDefaultEndDate(),[]],
          keyValue: [],
        }),
        userNotDo: this.fb.group({
          eventName: [''],
          eventProperty: [''],
          value: this.fb.array([]),
          typeCompare: ['EQUALS'],
          startTime: [this.calculateDefaultStartDate(),[]],
          endTime: [this.calculateDefaultEndDate(),[]],
        }),
        isAllUser: [],
      }),
      what: this.fb.group({
        title: [''],
        message: [''],
        timeToLive: [''],
        imageUrl: [''],
        iconUrl: [''],
        background: [''],
        deeplink: [''],
        customKeyValue: [],
      }),
      when: this.fb.group({ 
        repeat: [1],
        type: ['NOW'],
        endDate: [null],
        limit : [null],
        occurrence: [null],
        startDates: [],
      }),
      
    });
  }

  onSubmit() {
      if(this.id == null) {
        const reqData = Object.assign({}, this.fCampaign.value);
        reqData.when.type = this.typeWhen || 'NOW';
        reqData.when.startDates = this.selectedDatesList.map(dateString => {
                const dateObject = new Date(dateString);
                const formattedDate = dateObject.toLocaleString(); 
                return formattedDate;
              })
        reqData.what.customKeyValue = {
          type : this.slideValue,
          value : this.fCampaign.get('what.customKeyValue')?.value
        }      
        reqData.what.imageUrl = this.uploadedImages[0] || '';
        reqData.what.iconUrl = this.uploadedImages2[0] || '';
        reqData.what.background = this.uploadedImages3[0] || '';
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

  calculateDefaultStartDate(): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    return currentDate;
  }

  calculateDefaultEndDate(): Date {
    const currentDate = new Date();
    return currentDate;
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

  getEvent() {
    this.campaignService.getListEvent().subscribe((res: ResApi) => {
      if(res && res.status >= 200 && res.status <= 300) {
        this.lstEventname = res.data;
      }
    })
  }

  getlistProperties(event: any) {
    console.log(event);
    let tmp = String(event);
    console.log(tmp)
    if (!event) {
      this.lstProperty = [];
    }
    let filterProperty = new Object as Paging;
    this.evenNamevalue = event;
    filterProperty.evtName= `${event}`;

    this.campaignService.getListProperty(filterProperty)
    .subscribe((res: ResApi) => {
      if(res && res.status >= 200 && res.status <= 300) {
        this.lstProperty = res.data;
      }
      else {
        this.lstProperty = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.message || AppMessageResponse.BadRequest });
      }
      
    })
  }

  // check(){
  //   console.log(this.selectedDatesList.map(dateString => {
  //       const dateObject = new Date(dateString);
  //       const formattedDate = dateObject.toLocaleString(); 
  //       return formattedDate;
  //     }));
  // }

  getlistValues(event:any) {
    let queryParams = new Object as Paging;
    console.log(event)
    if (this.evenNamevalue) {
      queryParams.evtName = this.evenNamevalue;
      queryParams.property = event;
      
  
      this.campaignService.getListValues(queryParams).subscribe((res: ResApi) => {
        if (res && res.status >= 200 && res.status <= 300) {
          this.lstValues = res.data;
          console.log(res.data)
        } else {
          console.log(res.data)
          this.lstValues = [];
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res?.message || AppMessageResponse.BadRequest
          });
        }
      });
    } else {
      this.lstValues = [];
    }
  }

  formGroup(){
    this.fCampaign = this.fb.group({
    })

  }

  ChangeisAllUser(){
    if(this.isAllUser == false){
      this.isAllUser = true;
    } else 
    this.isAllUser = false;
  }

  ChangeCheckbox(){
    if(this.isCheck == false){
      this.isCheck = true;
    } else 
    this.isCheck = false;
  }

  onQualificationChange(value: string) {
    this.liveEventVisible = (value === 'LIVE_BEHAVIOR');
  }

  onimageUrl(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image');
      formData.append('file', file);
  
      this.http.post('http://localhost:9214/api/v1/upload/file', formData)
        .subscribe(
          (response: any) => {
            const uploadedImageName = response.data;
            this.uploadedImages.push(uploadedImageName); 
            this.updateInputValue();  
            console.log('Upload thành công:', response);
          },
          (error) => {
            console.error('Lỗi upload:', error);
          }
        );
    }
  }

  updateInputValue() {
    const imageUrlControl = this.fCampaign.get('what.imageUrl');
    if (imageUrlControl) {
      imageUrlControl.setValue(this.uploadedImages[0]);
      imageUrlControl.markAsDirty();
      imageUrlControl.markAsTouched();
    }
  }

  oniconUrl(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image');
      formData.append('file', file);
  
      this.http.post('http://localhost:9214/api/v1/upload/file', formData)
        .subscribe(
          (response: any) => {
            const uploadedImageName = response.data;
            this.uploadedImages2.push(uploadedImageName); 
            this.updateInputValue2();  
            console.log('Upload thành công:', response);
          },
          (error) => {
            console.error('Lỗi upload:', error);
          }
        );
    }
  }

  updateInputValue2() {
    const imageUrlControl = this.fCampaign.get('what.iconUrl');
    if (imageUrlControl) {
      imageUrlControl.setValue(this.uploadedImages2[0]);
      imageUrlControl.markAsDirty();
      imageUrlControl.markAsTouched();
    }
  }

  onBackground(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image');
      formData.append('file', file);
  
      this.http.post('http://localhost:9214/api/v1/upload/file', formData)
        .subscribe(
          (response: any) => {
            const uploadedImageName = response.data;
            this.uploadedImages3.push(uploadedImageName); 
            this.updateInputValue3();  
            console.log('Upload thành công:', response);
          },
          (error) => {
            console.error('Lỗi upload:', error);
          }
        );
    }
  }

  updateInputValue3() {
    const imageUrlControl = this.fCampaign.get('what.background');
    if (imageUrlControl) {
      imageUrlControl.setValue(this.uploadedImages3[0]);
      imageUrlControl.markAsDirty();
      imageUrlControl.markAsTouched();
    }
  }

  TypeWhen(event:any){
    this.typeWhen = event.value;
  }

  // addStartDate() {
  //   const startDatesArray = this.fCampaign.get('when.startDates') as FormArray;
  //   if (startDatesArray) {
  //     startDatesArray.push(this.fb.control(null));
  //   }
  // }

  
  onBack(event: Event) {
    let isShow = true;//this.layoutService.getIsShow();

    if (isShow) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: "Chưa hoàn tất thêm mới Campaign, Bạn có muốn quay lại?",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate(['category/project/list']);
        },
        reject: () => {
            return;
        }
      });
    } else {
      this.router.navigate(['category/campaign/list']);
    }
  }
}
