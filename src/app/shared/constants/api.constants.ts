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
  public static CreatePromotion = apiUrl.concat('promotions');
  public static getPromotionById = apiUrl.concat('promotions/');
  public static updatePromotion = apiUrl.concat('promotions/');
  public static activePromotion = apiUrl.concat('promotion/active?isActive=true&promotionId=');

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