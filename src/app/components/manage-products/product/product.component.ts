import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { AppMessageResponse } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { Product } from 'src/app/viewModels/product/product';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public filterParrams : Paging;
  public lstProduct : any;
  public first = 0;
  public rows = 10;
  id: any;
  public loading = [false];

  constructor(
    private readonly productService : ProductService,
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
    this.getListProduct();
  }

  getListProduct() {
    this.productService.getListByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstProduct = res.data.elements;
      }
      else {
        this.lstProduct = new Array<Product>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }
  getAttributeString(attributes: { [key: string]: string }): string {
    if (!attributes) {
      return '';
    }

    return Object.keys(attributes).map(key => `${key}: ${attributes[key]}`).join(', ');
  }

  activePromotion(id:number){}
  deadactivePromotion(id:number){}
  onDelete(item: Product ) {
    
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa Sản phẩm <b>"'+ item.name +'"</b> không?',
      header: 'XÓA SẢN PHẨM',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy bỏ',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.productService.deleteProduct(item.id).subscribe(
          (res: any) => {
            this.loading[0] = false;
            if (res && res.status >= 200 && res.status <= 300) {
              this.lstProduct = this.lstProduct.filter((s: { id: number; }) => s.id !== item.id);
              this.messageService.add({ severity: 'success', summary: 'Success',  detail: 'Xóa Sản phẩm thành công!' });
  
              
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
