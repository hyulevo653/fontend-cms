import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly dataService: DataService) { }

  getListByPaging(queryParams: Paging) {
    return this.dataService.get(ApiConstant.GetPromotionPage
      .concat(`?page=`, '' + (queryParams.page || 1))
      .concat(`&size=`, '' +  (queryParams.size || 15)))
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getPromotionById(id: number) {
    return this.dataService.get(ApiConstant.getPromotionById + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updatePromotion(id: number, reqData: any) {
    return this.dataService.put(ApiConstant.updatePromotion + id, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createProject(reqData: any) {
    return this.dataService.post(ApiConstant.CreatePromotion, reqData)
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
  deletePromotion(id: number) {
    return this.dataService.delete(ApiConstant.deletePromotion, id.toString() )
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
