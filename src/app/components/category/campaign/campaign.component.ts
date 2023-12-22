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

  onOpenDialog(id : string) {
    localStorage.setItem("idcampaign", id);

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
