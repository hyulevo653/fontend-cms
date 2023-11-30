import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private readonly dataService: DataService) { }

  getListByPaging(queryParams: Paging) {
    return this.dataService.get(ApiConstant.GetCampaignPage
      .concat(`?page=`, '' + (queryParams.page || 1))
      .concat(`&size=`, '' +  (queryParams.size || 15)))
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getCampaignById(id: number) {
    return this.dataService.get(ApiConstant.getCampaignById + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateCampaign(id: number, reqData: any) {
    return this.dataService.put(ApiConstant.updateCampaign + id, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createCampaign(reqData: any) {
    return this.dataService.post(ApiConstant.CreateCampaign, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteCampaign(id: number) {
    return this.dataService.delete(ApiConstant.deleteCampaign, id.toString() )
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
