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
  public static UpdatedSuccess = "Cập nhật thành công!";
  public static DeletedSuccess = "Xóa thành công!";
}

export class StorageData {
  public static userId = 'user_id';
  public static username = 'username';
  public static accessToken = 'accessToken';
}

export const paymentMethod = [
  { Name: 'SHIP_COD', value: 1 },
  { Name: 'PAYMENT_ONLINE', value: 2 },
]

export const promotionType = [
  { Name: 'PRODUCT', value: 1 },
  { Name: 'TRANSPORT', value: 2 },
];

export const discountType = [
  { Name: 'PERCENTAGE', value: 1 },
  { Name: 'CASH', value: 2 },
];

export const domainFileTemplate = environment.apiUrl.concat('/templates/import/');