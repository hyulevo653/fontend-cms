import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

export class ApiConstant {
  public static LoginUrl = apiUrl.concat('auth/login');

  public static Login = apiUrl.concat('auth/login');

  //#region "project"
  public static GetProjectByPaging = apiUrl.concat('promotions');
  public static CreateProject = apiUrl.concat('api/cms/project');
  public static UpdateProjectById = apiUrl.concat('api/cms/project/');
 

  //#region "tower"
  public static CreateTowerByUserId = apiUrl.concat('api/cms/tower');
  public static UpdateTowerById = apiUrl.concat('api/cms/tower/');
  public static GetTowerByPaging = apiUrl.concat('api/cms/tower/getByPage');

  //#region "floor"
  public static CreateFloorByUserId = apiUrl.concat('api/cms/floor');
  public static UpdateFloorById = apiUrl.concat('api/cms/floor/');
  public static GetFloorByPaging = apiUrl.concat('api/cms/floor/getByPage');
  public static GetFloorById = apiUrl.concat('api/cms/floor/');

    //#region "address"
    public static CreateAddressByUserCode = apiUrl.concat('api/cms/floor');
    public static UpdateAddressByUserCode = apiUrl.concat('api/cms/floor/');
    public static GetAddressByPaging = apiUrl.concat('api/cms/tower/getByPage'); // test 

  // promotions
  public static GetPromotionPage = apiUrl.concat('promotions');
  public static CreatePromotion = apiUrl.concat('promotion');
  public static getPromotionById = apiUrl.concat('promotion/');
  public static updatePromotion = apiUrl.concat('promotion/');
  public static deletePromotion = apiUrl.concat('promotion/');
  public static activePromotion = apiUrl.concat('promotion/active?isActive=true&promotionId=');
  public static deadactivePromotion = apiUrl.concat('promotion/active?isActive=false&promotionId=');

  //product
  public static GetProductPage = apiUrl.concat('products');
  public static CreateProduct = apiUrl.concat('product');
  public static getProductById = apiUrl.concat('product/');
  public static getItemById = apiUrl.concat('item/');
  public static updateItemById = apiUrl.concat('item');
  public static updateProduct = apiUrl.concat('product');
  public static deleteProduct = apiUrl.concat('product/');

  //categories
  public static GetCategoriesPage = apiUrl.concat('categories');
  public static CreateCategories = apiUrl.concat('category');
  public static getCategoriesById = apiUrl.concat('category/');
  public static updateCategories = apiUrl.concat('category/');
  public static deleteCategories = apiUrl.concat('category/');

  //order
  
  public static GetOrderPage = apiUrl.concat('orders');
  public static GetOrderPageStatus = apiUrl.concat('orders/manage');
  public static CreateOrder = apiUrl.concat('order');
  public static UpdateStatus= apiUrl.concat('order/status');
  public static getOrderById = apiUrl.concat('order/');
  public static updateOrder = apiUrl.concat('order/');
  public static deleteOrder = apiUrl.concat('order/');
  public static activeOrder = apiUrl.concat('order/active?isActive=true&OrderId=');
  public static deadactiveOrder = apiUrl.concat('order/active?isActive=false&orderId=');

  //campaign 
  public static GetCampaignPage = apiUrl.concat('campaigns');
  public static GetEventPage = apiUrl.concat('events');
  public static GetPropertyPage = apiUrl.concat('properties');
  public static GetValuesPage = apiUrl.concat('values');
  public static CreateCampaign = apiUrl.concat('campaign');
  public static getCampaignById = apiUrl.concat('campaign/');
  public static updateCampaign = apiUrl.concat('campaign/');
  public static deleteCampaign = apiUrl.concat('campaign/');

  //slide
  public static GetSliderPage = apiUrl.concat('slide');

  public static CreateSlider = apiUrl.concat('slide');
  public static getSliderById = apiUrl.concat('slide/');
  public static updateSlider = apiUrl.concat('slide/');
  public static deleteSlider = apiUrl.concat('slide/status/');
  public static statusSlider = apiUrl.concat('slide/status');


  //#endregion

  //#region "province"
  public static GetProvinceByPaging = apiUrl.concat('api/cms/province/getByPage');
  //#region 

  //#region "district"
  public static GetDistrictByPaging = apiUrl.concat('api/cms/district/getByPage');
  //#region

  //#region "ward"
  public static GetWardByPaging = apiUrl.concat('api/cms/ward/getByPage');
  static GetAddressByCode: any;
  //#region
}
