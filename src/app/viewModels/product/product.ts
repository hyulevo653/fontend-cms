
export class Product{
    id : number;
    name : string;
    description : string;
    thumb: string;
    productImages: [];
    price : string;
    categoryIds : [];
    attributes: {};
    itemRequests : Array<ItemRequest>;
    variantRequests : Array<VariantRequests>;

}

export class ItemRequest {
    quantity: number;
    image: string;
    price : string;
    itemVariantOption : {};
}

export class VariantRequests {
    variantName : string ;
    variantValues : [];
}

