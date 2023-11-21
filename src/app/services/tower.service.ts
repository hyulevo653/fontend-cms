import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TowerService {

  constructor(private readonly dataService: DataService) { }

  getListTowerByPaging(queryParams: Paging) {
    return this.dataService.get(ApiConstant.GetTowerByPaging
      .concat(`?page=`, '' + (queryParams.page || 1))
      .concat(`&page_size=`, '' +  (queryParams.page_size || 15))
      .concat(`&query=`, (queryParams.query || '1=1'))
      .concat(`&select=`, (queryParams.select || ''))
      .concat('&order_by=', (queryParams.order_by || '')))
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createTower(reqData: any) {
    return this.dataService.post(ApiConstant.CreateTowerByUserId, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}