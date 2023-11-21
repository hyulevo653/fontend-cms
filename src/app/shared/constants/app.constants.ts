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

export const domainFileTemplate = environment.apiUrl.concat('/templates/import/');