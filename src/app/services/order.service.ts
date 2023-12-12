import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly dataService: DataService) { }

  getListOrderByPaging(queryParams: Paging) {
    return this.dataService.get(ApiConstant.GetOrderPageStatus
      .concat(`?page=`, '' + (queryParams.page || 1))
      .concat(`&size=`, '' +  (queryParams.size || 10))
      .concat(`&status=`, (queryParams.query || '')))
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getOrderById(id: number) {
    return this.dataService.get(ApiConstant.getOrderById + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateOrder(id: number, reqData: any) {
    return this.dataService.put(ApiConstant.updateOrder + id, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createProject(reqData: any) {
    return this.dataService.post(ApiConstant.CreateOrder, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateStatus(reqData: any) {
    return this.dataService.post(ApiConstant.UpdateStatus, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  ActiveOrder(id: number) {
    return this.dataService.post(ApiConstant.activeOrder + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  DeadactiveOrder(id: number) {
    return this.dataService.post(ApiConstant.deadactiveOrder + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteOrder(id: number) {
    return this.dataService.delete(ApiConstant.deleteOrder, id.toString() )
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
