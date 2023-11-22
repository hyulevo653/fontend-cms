import { environment } from '../../../environments/environment';

export enum TokenEnum {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export class AppStatusCode {
  public static StatusCode200 = 200;
  public static StatusCode201 = 201;
  public static StatusCode400 = 400;
  public static StatusCode401 = 401;
  public static StatusCode422 = 422;
  public static StatusCode500 = 500;
}

export class StorageOption {
  public static Cookie = 'Cookie';
  public static LocalStorage = 'LocalStorage';
}

export class AppMessageResponse {
  public static BadRequest = "Hệ thống có lỗi sảy ra!";
  public static CreatedSuccess = "Thêm mới thành công!";
}

export class StorageData {
  public static userId = 'user_id';
  public static username = 'username';
  public static accessToken = 'accessToken';
}

export const promotionType = [
  { Name: 'PRODUCT', value: 1 },
  { Name: 'PRODUCTS', value: 2 },
  { Name: 'PRODUCTS', value: 3 }
];

export const discountType = [
  { Name: 'PERCENTAGE', value: 1 },
  { Name: 'PERCENTAGE2', value: 2 },
  { Name: 'PERCENTAGE3', value: 3 }
];

export const domainFileTemplate = environment.apiUrl.concat('/templates/import/');