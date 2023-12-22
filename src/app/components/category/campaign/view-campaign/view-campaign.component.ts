import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CommonService } from 'src/app/services/common.service';
import { AppMessageResponse } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.scss']
})
export class ViewCampaignComponent {

  id: any;
  public filterParrams : Paging;
  lstCampaign: any;
  dataCampaign : any;

  public testdata =    {
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
}

  constructor(
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly campaignService: CampaignService,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private http : HttpClient,
    private ref: DynamicDialogRef,
    public dialogService: DialogService,
    
    private readonly route: ActivatedRoute,
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id > 0){
      this.getListCampaignByPaging();
    }
  }

  getListCampaignByPaging() {
    this.campaignService.getListByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstCampaign = res.data.elements;
        for(let i =0;i<res.data.elements.length;i++){
          if(res.data.elements[i].id == this.id){
            this.dataCampaign = res.data.elements[i];
          }
        }
      }
      else {
        this.lstCampaign = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }

  convertArrToString(obj: any): string {
    return JSON.stringify(obj);
  }
  convertObjectToString(obj: any): string {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  }
  onBack(){
    // setTimeout(() => {this.ref.close()}, 700);
    setTimeout(() => {this.onReturnPage('/category/campaign/list')}, 1500);
  }
  onReturnPage(url: string) : void {
    this.router.navigate([url]);
  }
}
