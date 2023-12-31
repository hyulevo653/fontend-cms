import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/voucher.service';
import { ApiConstant } from 'src/app/shared/constants/api.constants';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { Project } from 'src/app/viewModels/project/project';
import { ResApi } from 'src/app/viewModels/res-api';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public filterParrams : Paging;
  public lstProject: Array<Project>;
  public first = 0;
  public rows = 10;
  id: any;
  public loading = [false];

  constructor(
    private readonly projectService: ProjectService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute, 
    private readonly confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;

    this.lstProject = new Array<Project>();
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
      this.getListProjectByPaging();
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

  getListProjectByPaging() {
    this.projectService.getListByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstProject = res.data.elements;
      }
      else {
        this.lstProject = new Array<Project>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }
  
  activePromotion(id : number){
    this.projectService.ActivePromotion(id).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Active thành công!'});
      }
      else {
        this.lstProject = new Array<Project>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }
  deadactivePromotion(id : number){
    this.projectService.DeadactivePromotion(id).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deadactive thành công!'});
      }
      else {
        this.lstProject = new Array<Project>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }

  editProject(itemProject: Project) {

  }

  onDelete(item: Project ) {
    
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa Voucher <b>"'+ item.name +'"</b> không?',
      header: 'XÓA VOUCHER',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy bỏ',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.projectService.deletePromotion(item.id).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.lstProject = this.lstProject.filter(s => s.id !== item.id);
              this.messageService.add({ severity: 'success', summary: 'Success',  detail: 'Xóa Voucher thành công!' });
  
              
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
