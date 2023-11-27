import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { AppMessageResponse, AppStatusCode, paymentMethod, promotionType } from 'src/app/shared/constants/app.constants';
import { Order } from 'src/app/viewModels/order/order';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {
  public itemOrder: Order;

  public fOrder!: FormGroup;
  public currentDate = new Date();
  public lstPayment = paymentMethod;

  public loading = [false];
  public id: any;
  data: any;

  constructor(
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly orderService: OrderService,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router,
    
    private readonly route: ActivatedRoute,
  ) {
    this.itemOrder = new Order();

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id){
      this.getorderById(this.id)
    }
    this.fOrder = this.fb.group({
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
    })
  }

  onSubmit() {
    if(this.fOrder.invalid){
      // this.markAllAsDirty()
    }else{
      if(this.id == null) {
        // this.fOrder.controls['id'].setValue(0);
        const reqData = Object.assign({}, this.fOrder.value);
        reqData.maxTotalOrder = this.fOrder.get('maxTotalOrder')?.value;
        this.loading[0] = true;
        this.orderService.createProject(reqData).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.CreatedSuccess });
              
              setTimeout(() => {this.onReturnPage('/category/order/list')}, 1000);
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
    
        const reqData = Object.assign({}, this.fOrder.value);
        this.loading[0] = true;
        this.orderService.updateOrder(this.id, reqData).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.UpdatedSuccess });
  
              setTimeout(() => {this.onReturnPage('/category/order/list')}, 1500);
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
  //   Object.keys(this.fOrder.controls).forEach(key => {
  //     const control = this.fOrder.get(key);
  //     if (control.enabled && control.invalid) {
  //       control.markAsDirty();
  //     }
  //   });
  // }

  onReturnPage(url: string) : void {
    this.router.navigate([url]);
  }

  getorderById(id: number) {    
    if(this.id != 0) {
      this.orderService.getOrderById(id).subscribe((res: ResApi) => {
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
    this.fOrder = this.fb.group({
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
          this.router.navigate(['category/order/list']);
        },
        reject: () => {
            return;
        }
      });
    } else {
      this.router.navigate(['category/order/list']);
    }
  }
}
