import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CampaignService } from 'src/app/services/campaign.service';
import { AppMessageResponse } from 'src/app/shared/constants/app.constants';
import { Campaign } from 'src/app/viewModels/campaign/campaign';
import { Paging } from 'src/app/viewModels/paging';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResApi } from 'src/app/viewModels/res-api';
import { ViewCampaignComponent } from './view-campaign/view-campaign.component';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent {
  public filterParrams : Paging;
  public lstCampaign: Array<Campaign>;
  public first = 0;
  public rows = 10;
  id: any;
  public loading = [false];

  public test =  [
    {
        "id": 19,
        "name": "Sobin test INAPP Test LIVE_BEHAVIOR 12122023",
        "qualification": "LIVE_BEHAVIOR",
        "forAll": true,
        "who": {
            "liveEvent": {
                "eventName": "Click Home",
                "eventProperty": "",
                "value": [
                    "1",
                    "2"
                ]
            },
            "userDid": {
                "eventName": "Buy",
                "eventProperty": "Price",
                "value": [
                    "10000",
                    "50000"
                ],
                "typeCompare": "BETWEEN",
                "typeCondition": "EQUALS",
                "count": 5,
                "startTime": null,
                "endTime": null
            },
            "userNotDo": {
                "eventName": "",
                "eventProperty": "",
                "value": [
                    "",
                    ""
                ],
                "typeCompare": "NOT_EQUALS",
                "startTime": null,
                "endTime": null
            },
            "typeCombine": "AND",
            "isAllUser": true
        },
        "what": {
            "title": "Test title",
            "message": "Test message",
            "timeToLive": 1,
            "imageUrl": "https://down-vn.img.susercontent.com/file/vn-50009109-98dff3ec15a59e4fc44c536e50f1a7e7",
            "iconUrl": "Test icon",
            "background": "test background",
            "deeplink": "test deeplink",
            "customKeyValue": {
                "a": "1",
                "b": "2"
            }
        },
        "when": {
            "type": "NOW",
            "startDates": [],
            "repeat": 1,
            "limit": 1,
            "endDate": null
        },
        "status": "RUNNING",
        "channel": "INAPP",
        "startTime": null,
        "updateTime": null,
        "createTime": "2023-12-12T03:36:03.870+00:00"
    },
    {
        "id": 18,
        "name": "Sobin test campaign Test PAST_BEHAVIOR xyz",
        "qualification": "LIVE_BEHAVIOR",
        "forAll": true,
        "who": {
            "liveEvent": {
                "eventName": "Click Home",
                "eventProperty": "",
                "value": [
                    "1",
                    "2"
                ]
            },
            "userDid": {
                "eventName": "Buy",
                "eventProperty": "Price",
                "value": [
                    "10000",
                    "50000"
                ],
                "typeCompare": "BETWEEN",
                "typeCondition": "EQUALS",
                "count": 5,
                "startTime": null,
                "endTime": null
            },
            "userNotDo": {
                "eventName": "",
                "eventProperty": "",
                "value": [
                    "",
                    ""
                ],
                "typeCompare": "NOT_EQUALS",
                "startTime": null,
                "endTime": null
            },
            "typeCombine": "AND",
            "isAllUser": true
        },
        "what": {
            "title": "Test title",
            "message": "Test message",
            "timeToLive": 1,
            "imageUrl": "test url",
            "iconUrl": "Test icon",
            "background": "test background",
            "deeplink": "test deeplink",
            "customKeyValue": {
                "a": "1",
                "b": "2"
            }
        },
        "when": {
            "type": "NOW",
            "startDates": null,
            "repeat": 1,
            "limit": null,
            "endDate": null
        },
        "status": "APPROVAL_PENDING",
        "channel": "INAPP",
        "startTime": null,
        "updateTime": null,
        "createTime": "2023-12-04T03:43:17.776+00:00"
    },
    {
        "id": 15,
        "name": "Sobin test campaign Test PAST_BEHAVIOR abc",
        "qualification": "LIVE_BEHAVIOR",
        "forAll": true,
        "who": {
            "liveEvent": {
                "eventName": "Click Home",
                "eventProperty": "",
                "value": [
                    "1",
                    "2"
                ]
            },
            "userDid": {
                "eventName": "Buy",
                "eventProperty": "Price",
                "value": [
                    "10000",
                    "50000"
                ],
                "typeCompare": "BETWEEN",
                "typeCondition": "EQUALS",
                "count": 5,
                "startTime": null,
                "endTime": null
            },
            "userNotDo": null,
            "typeCombine": "AND",
            "isAllUser": true
        },
        "what": {
            "title": "Test title",
            "message": "Test message",
            "timeToLive": 1,
            "imageUrl": "test url",
            "iconUrl": "Test icon",
            "background": "test background",
            "deeplink": "test deeplink",
            "customKeyValue": {
                "a": "1",
                "b": "2"
            }
        },
        "when": {
            "type": "NOW",
            "startDates": null,
            "repeat": 1,
            "limit": null,
            "endDate": null
        },
        "status": "APPROVAL_PENDING",
        "channel": "INAPP",
        "startTime": null,
        "updateTime": null,
        "createTime": "2023-12-04T03:35:25.489+00:00"
    },
    {
        "id": 14,
        "name": "Sobin test campaign Test PAST_BEHAVIOR inapp",
        "qualification": "LIVE_BEHAVIOR",
        "forAll": false,
        "who": {
            "liveEvent": {
                "eventName": "Click Home",
                "eventProperty": null,
                "value": null
            },
            "userDid": {
                "eventName": "Buy",
                "eventProperty": "Price",
                "value": [
                    "10000",
                    "50000"
                ],
                "typeCompare": "BETWEEN",
                "typeCondition": null,
                "count": 5,
                "startTime": null,
                "endTime": null
            },
            "userNotDo": null,
            "typeCombine": null,
            "isAllUser": true
        },
        "what": {
            "title": "Test title",
            "message": "Test message",
            "timeToLive": 1,
            "imageUrl": "https://down-vn.img.susercontent.com/file/vn-50009109-98dff3ec15a59e4fc44c536e50f1a7e7",
            "iconUrl": "Test icon",
            "background": "test background",
            "deeplink": "test deeplink",
            "customKeyValue": {
                "a": "1",
                "b": "2"
            }
        },
        "when": {
            "type": "NOW",
            "startDates": null,
            "repeat": 1,
            "limit": null,
            "endDate": null
        },
        "status": "RUNNING",
        "channel": "INAPP",
        "startTime": null,
        "updateTime": "2023-12-01T12:32:07.608+00:00",
        "createTime": "2023-12-01T12:31:50.591+00:00"
    },
    {
        "id": 12,
        "name": "Sobin test campaign Test PAST_BEHAVIOR b",
        "qualification": "PAST_BEHAVIOR",
        "forAll": false,
        "who": {
            "liveEvent": {
                "eventName": "Click Home",
                "eventProperty": "",
                "value": [
                    "1",
                    "2"
                ]
            },
            "userDid": {
                "eventName": "Buy",
                "eventProperty": "Price",
                "value": [
                    "10000",
                    "50000"
                ],
                "typeCompare": "BETWEEN",
                "typeCondition": null,
                "count": 5,
                "startTime": null,
                "endTime": null
            },
            "userNotDo": null,
            "typeCombine": null,
            "isAllUser": true
        },
        "what": {
            "title": "Test title",
            "message": "Test message",
            "timeToLive": 1,
            "imageUrl": "test url",
            "iconUrl": "Test icon",
            "background": "test background",
            "deeplink": "test deeplink",
            "customKeyValue": {
                "a": "1",
                "b": "2"
            }
        },
        "when": {
            "type": "NOW",
            "startDates": null,
            "repeat": 1,
            "limit": null,
            "endDate": null
        },
        "status": "COMPLETED",
        "channel": "PUSH",
        "startTime": null,
        "updateTime": "2023-12-01T12:12:19.610+00:00",
        "createTime": "2023-12-01T12:12:08.057+00:00"
    }
]


  constructor(
    private readonly campaignService: CampaignService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute, 
    private readonly confirmationService: ConfirmationService,
    private ref: DynamicDialogRef,
    private router: Router,
    public dialogService: DialogService,
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;

    this.lstCampaign= new Array<Campaign>();
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
      this.getListCampaignByPaging();
      // this.TestData();
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
  

  StopStatus(id:number){
    const reqData = {
      status : 'STOPPED'
    }
    this.campaignService.updateStatusCampaign(id,reqData).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.CreatedSuccess });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }


  ApproveStatus(id:number){
    const reqData = {
      status : 'SCHEDULED'
    }
    this.campaignService.updateStatusCampaign(id,reqData).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.CreatedSuccess });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }

  CantChange(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thể thay đổi trạng thái!' });
  }

  getListCampaignByPaging() {
    this.campaignService.getListByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstCampaign = res.data.elements;
      }
      else {
        this.lstCampaign = new Array<Campaign>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }
  
  // activePromotion(id : number){
  //   this.projectService.ActivePromotion(id).subscribe((res: ResApi) => {
  //     if (res && res.status >= 200 && res.status <= 300) {
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Active thành công!'});
  //     }
  //     else {
  //       this.lstProject = new Array<Project>();
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
  //     }
      
  //   })
  // }
  // deadactivePromotion(id : number){
  //   this.projectService.DeadactivePromotion(id).subscribe((res: ResApi) => {
  //     if (res && res.status >= 200 && res.status <= 300) {
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deadactive thành công!'});
  //     }
  //     else {
  //       this.lstProject = new Array<Project>();
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
  //     }
      
  //   })
  // }

  onOpenDialog(id : number) {

    this.ref = this.dialogService.open(ViewCampaignComponent, {
      header: 'Chi tiết Campaign',
      width: '80%',
      height: '75%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
  }


  onDelete(item: Campaign ) {
    
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa Campaign <b>"'+ item.name +'"</b> không?',
      header: 'XÓA Campaign',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy bỏ',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.campaignService.deleteCampaign(item.id).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.lstCampaign = this.lstCampaign.filter(s => s.id !== item.id);
              this.messageService.add({ severity: 'success', summary: 'Success',  detail: 'Xóa Campaign thành công!' });
  
              
              //return;
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest });
              return;
            }
          }
        );
        
      },
      reject: (type: any) => {
          return;
      }
    });
  }
}
