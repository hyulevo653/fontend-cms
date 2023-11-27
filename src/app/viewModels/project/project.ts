export class Project {
    public id : number ;
    public name: string ;
    public description: string | undefined;
    public promotionType: string | undefined;
    public discountType: string | undefined;
    public startDate: Date | undefined;
    public endDate: Date | undefined;
    public createDate : Date | undefined;
    public lastUpdate : Date | undefined;

    public discountRate : number | undefined;
    public minTotalOrder : number | undefined;
    public maxTotalOrder : number | undefined;
    public active : Boolean | undefined;

}
