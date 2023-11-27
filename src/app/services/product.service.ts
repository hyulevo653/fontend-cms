import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly dataService: DataService) { }

  getListByPaging(queryParams: Paging) {
    return this.dataService.get(ApiConstant.GetProductPage
      .concat(`?page=`, '' + (queryParams.page || 1))
      .concat(`&size=`, '' +  (queryParams.size || 15))
      .concat(`&keySearch=`, (queryParams.query || ''))
      .concat(`&sortField=`, (queryParams.sortField || 'createDate'))
      .concat('&sortOrder=', (queryParams.sortOrder || 'desc')))
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getProductById(id: number) {
    return this.dataService.get(ApiConstant.getProductById + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getItemProById(id: number) {
    return this.dataService.get(ApiConstant.getItemById + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateProduct(id: number, reqData: any) {
    return this.dataService.put(ApiConstant.updateProduct + id, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createProduct(reqData: any) {
    return this.dataService.post(ApiConstant.CreateProduct, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  ActivePromotion(id: number) {
    return this.dataService.post(ApiConstant.activePromotion + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  DeadactivePromotion(id: number) {
    return this.dataService.post(ApiConstant.deadactivePromotion + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteProduct(id: number) {
    return this.dataService.delete(ApiConstant.deleteProduct, id.toString() )
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
