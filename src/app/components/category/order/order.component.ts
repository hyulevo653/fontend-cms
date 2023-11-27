import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';
import { AppMessageResponse } from 'src/app/shared/constants/app.constants';
import { Order } from 'src/app/viewModels/order/order';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  fOrder : any;
  public filterParrams : Paging;
  public lstOrder: Array<Order>;
  public first = 0;
  lstStatus = [{
    Name : 'Thành Công',Id : 1
  },{
    Name : 'Thất Bại',Id : 2
  }]
  public rows = 10;
  id: any;
  public loading = [false];

  constructor(
    private readonly orderService: OrderService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute, 
    private readonly confirmationService: ConfirmationService,
    private router: Router,
    private readonly fb : FormBuilder,
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;

    this.lstOrder = new Array<Order>();
  }
  

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
      this.getListByPaging();
      this.fOrder = this.fb.group({
        Status : ['']
      })
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

  getListByPaging() {
    this.orderService.getListOrderByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstOrder = res.data.elements;
      }
      else {
        this.lstOrder = new Array<Order>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }

  onSelect(event:any){

  }
  
  activePromotion(id : number){
    this.orderService.ActiveOrder(id).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Active thành công!'});
      }
      else {
        this.lstOrder = new Array<Order>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }
  deadactivePromotion(id : number){
    this.orderService.DeadactiveOrder(id).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deadactive thành công!'});
      }
      else {
        this.lstOrder = new Array<Order>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }


  onDelete(item: Order ) {
    
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa Voucher <b>"'+ item.orderLines +'"</b> không?',
      header: 'XÓA ĐƠN HÀNG',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy bỏ',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.orderService.deleteOrder(item.id).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.lstOrder = this.lstOrder.filter(s => s.id !== item.id);
              this.messageService.add({ severity: 'success', summary: 'Success',  detail: 'Xóa đơn hàng thành công!' });
  
              
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
