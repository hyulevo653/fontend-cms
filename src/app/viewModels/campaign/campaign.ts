
export class Campaign{
    id : number;
    name : string;
    qualification : string;
    thumb: string;
    productImages: [];
    price : string;
    categoryIds : [];
    attributes: {};
    who : {
        eventName : string;
        eventProperty : string;
        value : number;
        isAllUser: boolean;
    };
    what : {
        title: string;
        message: string;
        timeToLive : number;
        imageUrl: string;
        iconUrl : string;
        background: string;
        deeplink: string;
        customKeyValue : {}
    };
    when : {
        type : string;
        repeat : number;
        endDate : Date;
    };
    status: string;
    channel : string;
}

