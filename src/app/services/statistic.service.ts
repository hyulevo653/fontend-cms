import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Paging } from '../viewModels/paging';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private readonly dataService: DataService) { }

  statisticOrder(reqData: any) {
    return this.dataService.post(ApiConstant.statisticOrder, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  statisticOrderStatus() {
    return this.dataService.post(ApiConstant.statisticOrderStatus)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  statisticOrderCategory(reqData: any) {
    return this.dataService.post(ApiConstant.statisticOrderCategory, reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStatisticGender() {
    return this.dataService.get(ApiConstant.StatisticGender)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStatisticLocation(identity: string) {
    return this.dataService.get(ApiConstant.StatisticLocation + (identity && identity.trim() !== '' ?  ('?identity=' + identity) : ''))
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getStatisticViewProduct(reqData: any, identity: string) {
    return this.dataService.post(ApiConstant.StatisticViewProduct +  (identity && identity.trim() !== '' ?  ('?identity=' + identity) : ''), reqData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStatisticViewDayProduct(reqData: any) {
    return this.dataService.post(ApiConstant.StatisticDayProduct, reqData )
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStatisticEvent(reqData: any) {
    return this.dataService.post(ApiConstant.StatisticEvent, reqData )
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStatisticUserActiveInterval(interval: string) {
    return this.dataService.get(ApiConstant.StatisticUserActiveInterval + '?interval=' + interval)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getUserStatistic() {
    return this.dataService.get(ApiConstant.StatisticUserNew)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
