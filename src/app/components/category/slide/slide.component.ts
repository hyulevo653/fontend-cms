import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SlideService } from 'src/app/services/slide.service';
import { AppMessageResponse } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';
import { Slide } from 'src/app/viewModels/slide/slide';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent {
  lstSlide : any;
  public filterParrams: Paging;
  public loading = [false];
  public id : any;
  public first = 0;
  public rows = 10;

  constructor(
    private readonly slideService: SlideService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute, 
    private readonly confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;

  }
  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
      this.getListSlideByPaging();
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

  getListSlideByPaging() {
    this.slideService.getListSliderByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstSlide = res.data.elements;
      }
      else {
        this.lstSlide = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }

  convertObjectToString(obj: any): string {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  }

  activeSlide(id: number) {
    const reqData = {
      id: id,
      isPublic: true
    };
  
    this.slideService.createStatus(reqData).subscribe(
      (res: ResApi) => {
        if (res && res.status >= 200 && res.status <= 300) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Public Slide thành công' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
        }
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest });
      }
    );
  }

  unactiveSlide(id:number){
    const reqData = {
      id: id,
      isPublic: false
    };
  
    this.slideService.createStatus(reqData).subscribe(
      (res: ResApi) => {
        if (res && res.status >= 200 && res.status <= 300) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Private Slide thành công' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
        }
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest });
      }
    );
  }


  onDelete(item: Slide ) {
    
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa Slide <b>"'+ item.name +'"</b> không?',
      header: 'Xóa Slide',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy bỏ',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.slideService.deleteSlider(item.id).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.lstSlide = this.lstSlide.filter((s: { id: number; }) => s.id !== item.id);
              this.messageService.add({ severity: 'success', summary: 'Success',  detail: 'Xóa Slide thành công!' });
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
