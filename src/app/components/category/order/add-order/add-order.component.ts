import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { AppMessageResponse, AppStatusCode, paymentMethod, promotionType } from 'src/app/shared/constants/app.constants';
import { Order } from 'src/app/viewModels/order/order';
import { Paging } from 'src/app/viewModels/paging';
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
  filterParrams: Paging;
  public loading = [false];
  public id: any;
  data: any;
  lstOrder: any;
  variants: any;
  mappedVariants: any;


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
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id){
      this.getListByPaging();
    }
  }
 
  public test : any;
//   testData(){
//     for(let i=0;i<this.testdata.length;i++){
//       if(this.testdata[i].id == this.id){
//         this.test = this.testdata[i].orderLines;
//         for(let j=0;j<this.testdata[i].orderLines.length;j++){
//           this.variants = this.testdata[i].orderLines[j].item.product.variants;
//           this.mappedVariants = this.variants.flatMap((variant: { name: any; variantOptions: any[]; }) => {
//             const variantName = variant.name;
//             const variantOptions = variant.variantOptions.map(option => option.value);
//             return variantOptions.map(option => `${variantName}-${option}`);
//           });
//         }
//       } 
//     }
//   }

  dataOrder : any;
  getListByPaging() {
    this.orderService.getListOrderByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstOrder = res.data.elements;
        for(let i=0;i<res.data.elements.length;i++){
          if(res.data.elements[i].id == this.id){
            this.dataOrder = res.data.elements[i];
            this.data = res.data.elements[i].orderLines;
            for(let j=0;j<res.data.elements[i].orderLines.length;j++){
              this.variants = res.data.elements[i].orderLines[j].item.product.variants;
              this.mappedVariants = this.variants.flatMap((variant: { name: any; variantOptions: any[]; }) => {
                const variantName = variant.name;
                const variantOptions = variant.variantOptions.map(option => option.value);
                return variantOptions.map(option => `${variantName}-${option}`);
              });
            }
          }
        }
      }
      else {
        this.lstOrder = new Array<Order>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }
  

  onReturnPage(url: string) : void {
    this.router.navigate([url]);
  }


  onBack(event: Event) {
    let isShow = true;

    if (isShow) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: "Bạn có muốn quay lại?",
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
