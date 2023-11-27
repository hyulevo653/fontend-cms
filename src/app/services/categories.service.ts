import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly dataService: DataService) { }

  getListByPaging(queryParams: Paging) {
    return this.dataService.get(ApiConstant.GetCategoriesPage
      .concat(`?page=`, '' + (queryParams.page || 1))
      .concat(`&size=`, '' +  (queryParams.size || 15)))
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getCategoriesById(id: number) {
    return this.dataService.get(ApiConstant.getCategoriesById + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateCategories(id: number, reqData: any) {
    return this.dataService.put(ApiConstant.updateCategories + id, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createCategory(reqData: any) {
    return this.dataService.post(ApiConstant.CreateCategories, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteCategories(id: number) {
    return this.dataService.delete(ApiConstant.deleteCategories, id.toString() )
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
