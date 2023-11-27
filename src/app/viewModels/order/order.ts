export class Order {
    public id : number ;
    public orderLines: string ;
    public note: string | undefined;
    public addressId: string | undefined;
    public paymentMethod: string | undefined;
    public promotionCode: Date | undefined;
    public active : Boolean | undefined;

}
