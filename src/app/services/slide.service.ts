import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private readonly dataService: DataService) { }

  getListSliderByPaging(queryParams: Paging) {
    return this.dataService.get(ApiConstant.GetSliderPage
      .concat(`?page=`, '' + (queryParams.page || 1))
      .concat(`&size=`, '' +  (queryParams.size || 10))
      .concat(`&sortField=`, (queryParams.sortField || 'createDate'))
      .concat(`&sortOrder=`, (queryParams.sortOrder || 'desc')))
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getSliderById(id: number) {
    return this.dataService.get(ApiConstant.getSliderById + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateSlider(id: number, reqData: any) {
    return this.dataService.put(ApiConstant.updateSlider + id, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  createSlider(reqData: any) {
    return this.dataService.post(ApiConstant.CreateSlider, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  createStatus(reqData: any) {
    return this.dataService.post(ApiConstant.statusSlider, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteSlider(id: number) {
    return this.dataService.delete(ApiConstant.deleteSlider, id.toString() )
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
