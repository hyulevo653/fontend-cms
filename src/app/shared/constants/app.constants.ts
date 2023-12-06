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
export const StatusOrder = [
  { id: 1, name: 'Đơn hàng được tạo chưa mua', code: 'DRAFT' },
  { id: 2, name: 'Đơn hàng đã được tạo, nhưng chưa được xử lý hoặc thanh toán.', code: 'PENDING' },
  { id: 3, name: 'Đơn hàng đang được xử lý, bao gồm việc kiểm tra hàng tồn kho, đóng gói sản phẩm, và chuẩn bị cho việc giao hàng.', code: 'PROCESSING' },
  { id: 4, name: 'Đơn hàng đã được giao cho dịch vụ vận chuyển hoặc đang trên đường đến địa chỉ của khách hàng.', code: 'SHIPPED' },
  { id: 5, name: 'Đơn hàng đã được giao thành công cho khách hàng.', code: 'DELIVERED' },
  { id: 6, name: 'Đơn hàng đã bị hủy bỏ trước khi giao hàng hoặc sau khi đơn hàng đã được xử lý.', code: 'CANCELED' },
  { id: 7, name: 'Đơn hàng đã được giao, nhưng sau đó được khách hàng trả lại vì lý do nào đó.', code: 'RETURNED' },
  { id: 8, name: 'Đơn hàng đã được hủy bỏ và tiền đã được hoàn trả cho khách hàng.', code: 'REFUNDED' },
  { id: 8, name: 'Đơn hàng đã được xử lý hoàn toàn và không còn cần quan tâm nữa.', code: 'COMPLETE' },
  { id: 9, name: 'Đơn hàng không thể được xử lý do vấn đề kỹ thuật hoặc tài chính.', code: 'FAILED' },
]

export const StatusCampaign = [
  { id: 1, name: 'SCHEDULED'},
  { id: 2, name: 'RUNNING'},
  { id: 3, name: 'STOPPED' },
  { id: 4, name: 'COMPLETED'},
  { id: 5, name: 'DRAFT'},
  { id: 6, name: 'AWAITING_NEXT_RUN'},
  { id: 7, name: 'APPROVAL_PENDING' },
  { id: 8, name: 'ARCHIVE' },
  { id: 8, name: 'INITIALIZING'  },
  { id: 9, name: 'PUSHING' },
]
export const qualification = [
  { Name: 'PAST_BEHAVIOR', value: 1 },
  { Name: 'LIVE_BEHAVIOR', value: 2 },
];
export const channelCampaign = [
  { Name: 'PUSH', value: 1 },
  { Name: 'INAPP', value: 2 },
  { Name: 'EMAIL', value: 2 },
];
export const TypeWhen = [
  { Name: 'SPECIFIC_TIME', value: 1 },
  { Name: 'NOW', value: 2 },
  { Name: 'RECURRING', value: 4 },
  { Name: 'MULTIPLE_DATE', value: 5 },
];



export const promotionType = [
  { Name: 'PRODUCT', value: 1 },
  { Name: 'TRANSPORT', value: 2 },
];

export const TypeCombine = [
  { Name: 'AND', value: 1 },
  { Name: 'OR', value: 2 },
];

export const TypeCombineUser = [
  { Name: 'EQUALS', value: 1 },
  { Name: 'NOT_EQUALS', value: 2 },
  { Name: 'GREATER_OR_EQUALS', value: 3 },
  { Name: 'GREATER', value: 4 },
  { Name: 'LESS_OR_EQUALS', value: 5 },
  { Name: 'LESS', value: 6 },
  { Name: 'BETWEEN', value: 7 },
  { Name: 'EXISTED', value: 8 },
];


export const discountType = [
  { Name: 'PERCENTAGE', value: 1 },
  { Name: 'CASH', value: 2 },
];

export const domainFileTemplate = environment.apiUrl.concat('/templates/import/');