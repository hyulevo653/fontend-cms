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

  createProject(reqData: any) {
    return this.dataService.post(ApiConstant.CreateProject, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
