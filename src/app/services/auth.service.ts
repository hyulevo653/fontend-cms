import { Injectable } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { DataService } from '../shared/services/data.service';
import { ApiConstant } from '../shared/constants/api.constants';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { StorageData } from '../shared/constants/app.constants';
import { BehaviorSubject } from 'rxjs';
import { ReqLoginModel } from 'src/app/view-models/auth/req-login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlState = new BehaviorSubject<any>({});
  public redirectUrl = this.urlState.asObservable();

  constructor(
    private readonly dataService: DataService,
    private readonly storeService: StorageService,
    private readonly cookieService: CookieService
    ) { }

    login (reqData: ReqLoginModel) {
      return this.dataService.post(ApiConstant.Login, {...reqData})
      .pipe(map((res: any) => {

        return res;
      }));
    }

    logout() {
      this.clearStoreData();
    }

    setStoreData(dataUser: any) {
      this.cookieService.set(StorageData.accessToken, dataUser.accessToken);
    }

    clearStoreData() {
      this.cookieService.deleteAll();
      this.storeService.clear();
    }

    getAccessToken() {
      return this.cookieService.get(StorageData.accessToken);
    }

    setUrlRedirect (url: string) {
      this.urlState.next(url);
    }
  
    getUrlRedirect () : string {
      let resUrl = '';
  
      this.redirectUrl.subscribe((res) => { resUrl = res });
  
      return resUrl;
    }
}
