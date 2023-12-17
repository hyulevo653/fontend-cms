import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { AppMessageResponse, AppStatusCode, paymentMethod, promotionType } from 'src/app/shared/constants/app.constants';
import { Order } from 'src/app/viewModels/order/order';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {
  public itemOrder: Order;

  public fOrder!: FormGroup;
  public currentDate = new Date();
  public lstPayment = paymentMethod;
  filterParrams: Paging;
  public loading = [false];
  public id: any;
  data: any;
  lstOrder: any;
  variants: any;
  mappedVariants: any;
  public testdata =  [
    {
        "id": 26,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 1000.0,
        "note": "",
        "deliveryAddress": "So nha 5 Duong 30 Canh Nậu, Thạch Thất, Hà Nội",
        "orderLines": [
            {
                "id": 34,
                "item": {
                    "id": 9,
                    "quantity": 10,
                    "itemImage": "https://th.bing.com/th/id/OIG.H1jFUmLGzEl4n8nAPqfy?pid=ImgGn",
                    "price": 1300000,
                    "lastUpdate": "2023-12-05T08:38:07.506+0000",
                    "product": {
                        "id": 6,
                        "categories": [
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Ghế gỗ đẹp 2023",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://th.bing.com/th/id/OIG.lQJJI6FC9KhSdEyoKXNP?pid=ImgGn",
                            "https://th.bing.com/th/id/OIG.H1jFUmLGzEl4n8nAPqfy?pid=ImgGn",
                            "https://th.bing.com/th/id/OIG..nqHwbsP5Nr9AnCjyBmZ?w=1024&h=1024&rs=1&pid=ImgDetMain",
                            "https://th.bing.com/th/id/OIG.jZ1qBcx.kCbdAZUos8bc?pid=ImgGn"
                        ],
                        "productThumb": "https://th.bing.com/th/id/OIG.lQJJI6FC9KhSdEyoKXNP?pid=ImgGn",
                        "showedPrice": 20000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 4,
                                "variantOptions": [
                                    {
                                        "id": 8,
                                        "value": "Đỏ"
                                    },
                                    {
                                        "id": 10,
                                        "value": "Xanh"
                                    }
                                ],
                                "name": "Màu"
                            },
                            {
                                "id": 5,
                                "variantOptions": [
                                    {
                                        "id": 7,
                                        "value": "Nhỏ"
                                    },
                                    {
                                        "id": 9,
                                        "value": "To"
                                    }
                                ],
                                "name": "Size"
                            }
                        ],
                        "createDate": "2023-12-05T08:38:07.506+0000",
                        "lastUpdate": "2023-12-05T08:38:07.506+0000",
                        "status": "ACTIVE",
                        "paidCount": 0,
                        "paidCountSixMonthAgo": 0,
                        "averageRating": -1.0,
                        "volume": 0.0
                    },
                    "variantOptions": [
                        {
                            "id": 8,
                            "value": "Đỏ"
                        },
                        {
                            "id": 9,
                            "value": "To"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 1300000
            }
        ],
        "orderTotal": 1251000,
        "orderStatus": "PENDING",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "",
        "orderDate": "2023-12-12T06:04:52.365+0000"
    },
    {
        "id": 25,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 1000.0,
        "note": "",
        "deliveryAddress": "So nha 5 Duong 30 Canh Nậu, Thạch Thất, Hà Nội",
        "orderLines": [
            {
                "id": 33,
                "item": {
                    "id": 9,
                    "quantity": 10,
                    "itemImage": "https://th.bing.com/th/id/OIG.H1jFUmLGzEl4n8nAPqfy?pid=ImgGn",
                    "price": 1300000,
                    "lastUpdate": "2023-12-05T08:38:07.506+0000",
                    "product": {
                        "id": 6,
                        "categories": [
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Ghế gỗ đẹp 2023",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://th.bing.com/th/id/OIG.lQJJI6FC9KhSdEyoKXNP?pid=ImgGn",
                            "https://th.bing.com/th/id/OIG.H1jFUmLGzEl4n8nAPqfy?pid=ImgGn",
                            "https://th.bing.com/th/id/OIG..nqHwbsP5Nr9AnCjyBmZ?w=1024&h=1024&rs=1&pid=ImgDetMain",
                            "https://th.bing.com/th/id/OIG.jZ1qBcx.kCbdAZUos8bc?pid=ImgGn"
                        ],
                        "productThumb": "https://th.bing.com/th/id/OIG.lQJJI6FC9KhSdEyoKXNP?pid=ImgGn",
                        "showedPrice": 20000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 4,
                                "variantOptions": [
                                    {
                                        "id": 8,
                                        "value": "Đỏ"
                                    },
                                    {
                                        "id": 10,
                                        "value": "Xanh"
                                    }
                                ],
                                "name": "Màu"
                            },
                            {
                                "id": 5,
                                "variantOptions": [
                                    {
                                        "id": 7,
                                        "value": "Nhỏ"
                                    },
                                    {
                                        "id": 9,
                                        "value": "To"
                                    }
                                ],
                                "name": "Size"
                            }
                        ],
                        "createDate": "2023-12-05T08:38:07.506+0000",
                        "lastUpdate": "2023-12-05T08:38:07.506+0000",
                        "status": "ACTIVE",
                        "paidCount": 0,
                        "paidCountSixMonthAgo": 0,
                        "averageRating": -1.0,
                        "volume": 0.0
                    },
                    "variantOptions": [
                        {
                            "id": 8,
                            "value": "Đỏ"
                        },
                        {
                            "id": 9,
                            "value": "To"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 1300000
            }
        ],
        "orderTotal": 1251000,
        "orderStatus": "CANCELED",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "",
        "orderDate": "2023-12-12T05:48:36.572+0000"
    },
    {
        "id": 24,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 1000.0,
        "note": "",
        "deliveryAddress": "So nha 5 Duong 30 Canh Nậu, Thạch Thất, Hà Nội",
        "orderLines": [
            {
                "id": 32,
                "item": {
                    "id": 7,
                    "quantity": 10,
                    "itemImage": "https://th.bing.com/th/id/OIG..nqHwbsP5Nr9AnCjyBmZ?w=1024&h=1024&rs=1&pid=ImgDetMain",
                    "price": 1000000,
                    "lastUpdate": "2023-12-05T08:38:07.506+0000",
                    "product": {
                        "id": 6,
                        "categories": [
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Ghế gỗ đẹp 2023",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://th.bing.com/th/id/OIG.lQJJI6FC9KhSdEyoKXNP?pid=ImgGn",
                            "https://th.bing.com/th/id/OIG.H1jFUmLGzEl4n8nAPqfy?pid=ImgGn",
                            "https://th.bing.com/th/id/OIG..nqHwbsP5Nr9AnCjyBmZ?w=1024&h=1024&rs=1&pid=ImgDetMain",
                            "https://th.bing.com/th/id/OIG.jZ1qBcx.kCbdAZUos8bc?pid=ImgGn"
                        ],
                        "productThumb": "https://th.bing.com/th/id/OIG.lQJJI6FC9KhSdEyoKXNP?pid=ImgGn",
                        "showedPrice": 20000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 4,
                                "variantOptions": [
                                    {
                                        "id": 8,
                                        "value": "Đỏ"
                                    },
                                    {
                                        "id": 10,
                                        "value": "Xanh"
                                    }
                                ],
                                "name": "Màu"
                            },
                            {
                                "id": 5,
                                "variantOptions": [
                                    {
                                        "id": 7,
                                        "value": "Nhỏ"
                                    },
                                    {
                                        "id": 9,
                                        "value": "To"
                                    }
                                ],
                                "name": "Size"
                            }
                        ],
                        "createDate": "2023-12-05T08:38:07.506+0000",
                        "lastUpdate": "2023-12-05T08:38:07.506+0000",
                        "status": "ACTIVE",
                        "paidCount": 0,
                        "paidCountSixMonthAgo": 0,
                        "averageRating": -1.0,
                        "volume": 0.0
                    },
                    "variantOptions": [
                        {
                            "id": 8,
                            "value": "Đỏ"
                        },
                        {
                            "id": 7,
                            "value": "Nhỏ"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 1000000
            }
        ],
        "orderTotal": 1001000,
        "orderStatus": "CANCELED",
        "method": "SHIP_COD",
        "paidPrice": 0,
        "promotionCode": "",
        "orderDate": "2023-12-12T05:35:32.649+0000"
    },
    {
        "id": 23,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 827000.0,
        "note": "",
        "deliveryAddress": "So nha 5 Duong 30 Canh Nậu, Thạch Thất, Hà Nội",
        "orderLines": [
            {
                "id": 31,
                "item": {
                    "id": 6,
                    "quantity": 10,
                    "itemImage": "https://th.bing.com/th/id/OIG.i9WxgobTEXExQ0tmdae9?pid=ImgGn",
                    "price": 11050000,
                    "lastUpdate": "2023-11-17T07:06:47.487+0000",
                    "product": {
                        "id": 5,
                        "categories": [
                            {
                                "id": 3,
                                "name": "Bàn ghế",
                                "imageIcon": "https://th.bing.com/th/id/OIG.YVcQ10GGlxiRKDQ2_7Eh?pid=ImgGn",
                                "orderShow": 1
                            },
                            {
                                "id": 2,
                                "name": "Cửa gỗ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Circle-icons-door.svg/512px-Circle-icons-door.svg.png",
                                "orderShow": 1
                            },
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Bàn ghế 2023 mới",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmpd5ivuqk7z87",
                            "https://down-vn.img.susercontent.com/file/6bce268e1ef6b0e94c7d9105ccd24dea"
                        ],
                        "productThumb": "https://noithatvietba.com/wp-content/uploads/2020/10/sofa-go-nguyen-khoi-vb-6304-1.jpg.webp",
                        "showedPrice": 22000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 3,
                                "variantOptions": [
                                    {
                                        "id": 6,
                                        "value": "Xanh"
                                    },
                                    {
                                        "id": 5,
                                        "value": "Đỏ"
                                    }
                                ],
                                "name": "Màu"
                            }
                        ],
                        "createDate": "2023-11-17T07:06:47.487+0000",
                        "lastUpdate": "2023-11-17T07:06:47.487+0000",
                        "status": "ACTIVE",
                        "paidCount": 4,
                        "paidCountSixMonthAgo": 4,
                        "averageRating": -1.0,
                        "volume": 3.0
                    },
                    "variantOptions": [
                        {
                            "id": 6,
                            "value": "Xanh"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 11050000
            }
        ],
        "orderTotal": 11877000,
        "orderStatus": "CANCELED",
        "method": "SHIP_COD",
        "paidPrice": 0,
        "promotionCode": "",
        "orderDate": "2023-12-12T04:28:38.653+0000"
    },
    {
        "id": 22,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 752000.0,
        "note": "",
        "deliveryAddress": null,
        "orderLines": [
            {
                "id": 30,
                "item": {
                    "id": 4,
                    "quantity": 9,
                    "itemImage": "https://th.bing.com/th/id/OIP.GLw7uxf2a5uN_YhN5QfJygHaJ4?rs=1&pid=ImgDetMain",
                    "price": 11000000,
                    "lastUpdate": "2023-11-17T04:30:59.162+0000",
                    "product": {
                        "id": 4,
                        "categories": [
                            {
                                "id": 2,
                                "name": "Cửa gỗ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Circle-icons-door.svg/512px-Circle-icons-door.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Sập thờ mới nhất 2023",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llh1h1dobmpi62",
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmpd5ivukxy7c4"
                        ],
                        "productThumb": "http://ancuongdecor.com/img_data/images/cong-ty-san-xuat-go-noi-that.jpg",
                        "showedPrice": 20000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 2,
                                "variantOptions": [
                                    {
                                        "id": 3,
                                        "value": "Đỏ"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Xanh"
                                    }
                                ],
                                "name": "Màu"
                            }
                        ],
                        "createDate": "2023-11-17T04:30:59.162+0000",
                        "lastUpdate": "2023-11-17T04:30:59.162+0000",
                        "status": "ACTIVE",
                        "paidCount": 4,
                        "paidCountSixMonthAgo": 4,
                        "averageRating": -1.0,
                        "volume": 3.0
                    },
                    "variantOptions": [
                        {
                            "id": 4,
                            "value": "Xanh"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 2,
                "price": 11000000
            }
        ],
        "orderTotal": 22252000,
        "orderStatus": "DELIVERED",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "",
        "orderDate": "2023-12-01T11:23:28.189+0000"
    },
    {
        "id": 21,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 902000.0,
        "note": "",
        "deliveryAddress": null,
        "orderLines": [
            {
                "id": 29,
                "item": {
                    "id": 4,
                    "quantity": 9,
                    "itemImage": "https://th.bing.com/th/id/OIP.GLw7uxf2a5uN_YhN5QfJygHaJ4?rs=1&pid=ImgDetMain",
                    "price": 11000000,
                    "lastUpdate": "2023-11-17T04:30:59.162+0000",
                    "product": {
                        "id": 4,
                        "categories": [
                            {
                                "id": 2,
                                "name": "Cửa gỗ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Circle-icons-door.svg/512px-Circle-icons-door.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Sập thờ mới nhất 2023",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llh1h1dobmpi62",
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmpd5ivukxy7c4"
                        ],
                        "productThumb": "http://ancuongdecor.com/img_data/images/cong-ty-san-xuat-go-noi-that.jpg",
                        "showedPrice": 20000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 2,
                                "variantOptions": [
                                    {
                                        "id": 3,
                                        "value": "Đỏ"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Xanh"
                                    }
                                ],
                                "name": "Màu"
                            }
                        ],
                        "createDate": "2023-11-17T04:30:59.162+0000",
                        "lastUpdate": "2023-11-17T04:30:59.162+0000",
                        "status": "ACTIVE",
                        "paidCount": 4,
                        "paidCountSixMonthAgo": 4,
                        "averageRating": -1.0,
                        "volume": 3.0
                    },
                    "variantOptions": [
                        {
                            "id": 4,
                            "value": "Xanh"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 11000000
            }
        ],
        "orderTotal": 11402000,
        "orderStatus": "CANCELED",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "",
        "orderDate": "2023-11-24T10:22:54.889+0000"
    },
    {
        "id": 20,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 677000.0,
        "note": "khong tra tien neu hang xau",
        "deliveryAddress": null,
        "orderLines": [
            {
                "id": 28,
                "item": {
                    "id": 5,
                    "quantity": 7,
                    "itemImage": "https://th.bing.com/th/id/OIG.i9WxgobTEXExQ0tmdae9?pid=ImgGn",
                    "price": 10000000,
                    "lastUpdate": "2023-11-17T07:06:47.487+0000",
                    "product": {
                        "id": 5,
                        "categories": [
                            {
                                "id": 3,
                                "name": "Bàn ghế",
                                "imageIcon": "https://th.bing.com/th/id/OIG.YVcQ10GGlxiRKDQ2_7Eh?pid=ImgGn",
                                "orderShow": 1
                            },
                            {
                                "id": 2,
                                "name": "Cửa gỗ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Circle-icons-door.svg/512px-Circle-icons-door.svg.png",
                                "orderShow": 1
                            },
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Bàn ghế 2023 mới",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmpd5ivuqk7z87",
                            "https://down-vn.img.susercontent.com/file/6bce268e1ef6b0e94c7d9105ccd24dea"
                        ],
                        "productThumb": "https://noithatvietba.com/wp-content/uploads/2020/10/sofa-go-nguyen-khoi-vb-6304-1.jpg.webp",
                        "showedPrice": 22000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 3,
                                "variantOptions": [
                                    {
                                        "id": 6,
                                        "value": "Xanh"
                                    },
                                    {
                                        "id": 5,
                                        "value": "Đỏ"
                                    }
                                ],
                                "name": "Màu"
                            }
                        ],
                        "createDate": "2023-11-17T07:06:47.487+0000",
                        "lastUpdate": "2023-11-17T07:06:47.487+0000",
                        "status": "ACTIVE",
                        "paidCount": 4,
                        "paidCountSixMonthAgo": 4,
                        "averageRating": -1.0,
                        "volume": 3.0
                    },
                    "variantOptions": [
                        {
                            "id": 5,
                            "value": "Đỏ"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 10000000
            }
        ],
        "orderTotal": 10477000,
        "orderStatus": "PENDING",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "CTKM1",
        "orderDate": "2023-11-24T08:35:35.466+0000"
    },
    {
        "id": 19,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 902000.0,
        "note": "",
        "deliveryAddress": null,
        "orderLines": [
            {
                "id": 27,
                "item": {
                    "id": 6,
                    "quantity": 10,
                    "itemImage": "https://th.bing.com/th/id/OIG.i9WxgobTEXExQ0tmdae9?pid=ImgGn",
                    "price": 11050000,
                    "lastUpdate": "2023-11-17T07:06:47.487+0000",
                    "product": {
                        "id": 5,
                        "categories": [
                            {
                                "id": 3,
                                "name": "Bàn ghế",
                                "imageIcon": "https://th.bing.com/th/id/OIG.YVcQ10GGlxiRKDQ2_7Eh?pid=ImgGn",
                                "orderShow": 1
                            },
                            {
                                "id": 2,
                                "name": "Cửa gỗ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Circle-icons-door.svg/512px-Circle-icons-door.svg.png",
                                "orderShow": 1
                            },
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Bàn ghế 2023 mới",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmpd5ivuqk7z87",
                            "https://down-vn.img.susercontent.com/file/6bce268e1ef6b0e94c7d9105ccd24dea"
                        ],
                        "productThumb": "https://noithatvietba.com/wp-content/uploads/2020/10/sofa-go-nguyen-khoi-vb-6304-1.jpg.webp",
                        "showedPrice": 22000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 3,
                                "variantOptions": [
                                    {
                                        "id": 6,
                                        "value": "Xanh"
                                    },
                                    {
                                        "id": 5,
                                        "value": "Đỏ"
                                    }
                                ],
                                "name": "Màu"
                            }
                        ],
                        "createDate": "2023-11-17T07:06:47.487+0000",
                        "lastUpdate": "2023-11-17T07:06:47.487+0000",
                        "status": "ACTIVE",
                        "paidCount": 4,
                        "paidCountSixMonthAgo": 4,
                        "averageRating": -1.0,
                        "volume": 3.0
                    },
                    "variantOptions": [
                        {
                            "id": 6,
                            "value": "Xanh"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 11050000
            }
        ],
        "orderTotal": 11352000,
        "orderStatus": "COMPLETE",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "CTKM1",
        "orderDate": "2023-11-24T06:43:46.512+0000"
    },
    {
        "id": 18,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 752000.0,
        "note": "",
        "deliveryAddress": null,
        "orderLines": [
            {
                "id": 26,
                "item": {
                    "id": 5,
                    "quantity": 7,
                    "itemImage": "https://th.bing.com/th/id/OIG.i9WxgobTEXExQ0tmdae9?pid=ImgGn",
                    "price": 10000000,
                    "lastUpdate": "2023-11-17T07:06:47.487+0000",
                    "product": {
                        "id": 5,
                        "categories": [
                            {
                                "id": 3,
                                "name": "Bàn ghế",
                                "imageIcon": "https://th.bing.com/th/id/OIG.YVcQ10GGlxiRKDQ2_7Eh?pid=ImgGn",
                                "orderShow": 1
                            },
                            {
                                "id": 2,
                                "name": "Cửa gỗ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Circle-icons-door.svg/512px-Circle-icons-door.svg.png",
                                "orderShow": 1
                            },
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Bàn ghế 2023 mới",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmpd5ivuqk7z87",
                            "https://down-vn.img.susercontent.com/file/6bce268e1ef6b0e94c7d9105ccd24dea"
                        ],
                        "productThumb": "https://noithatvietba.com/wp-content/uploads/2020/10/sofa-go-nguyen-khoi-vb-6304-1.jpg.webp",
                        "showedPrice": 22000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 3,
                                "variantOptions": [
                                    {
                                        "id": 6,
                                        "value": "Xanh"
                                    },
                                    {
                                        "id": 5,
                                        "value": "Đỏ"
                                    }
                                ],
                                "name": "Màu"
                            }
                        ],
                        "createDate": "2023-11-17T07:06:47.487+0000",
                        "lastUpdate": "2023-11-17T07:06:47.487+0000",
                        "status": "ACTIVE",
                        "paidCount": 4,
                        "paidCountSixMonthAgo": 4,
                        "averageRating": -1.0,
                        "volume": 3.0
                    },
                    "variantOptions": [
                        {
                            "id": 5,
                            "value": "Đỏ"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 1,
                "price": 10000000
            }
        ],
        "orderTotal": 10552000,
        "orderStatus": "PENDING",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "CTKM1",
        "orderDate": "2023-11-24T03:53:32.171+0000"
    },
    {
        "id": 16,
        "account": {
            "id": 2,
            "email": "dungsobin102@gmail.com",
            "createDate": 1700136396512,
            "user": {
                "id": 2,
                "email": "dungsobin102@gmail.com",
                "name": "Đỗ Đăng Dũng",
                "gender": "UNDEFINED",
                "specificAddress": "So nha 5 Duong 30",
                "city": "Hà Nội",
                "district": "Thạch Thất",
                "village": "Canh Nậu",
                "phoneNumber": "0963846563",
                "avatar": "https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/User.png",
                "registerEmail": true,
                "verifyProfile": true,
                "registerNotification": true,
                "verifyPhoneNumber": false
            },
            "roles": [
                {
                    "id": 1,
                    "name": "ADMIN"
                },
                {
                    "id": 2,
                    "name": "MODERATOR"
                },
                {
                    "id": 3,
                    "name": "USER"
                }
            ],
            "active": true
        },
        "shippingPrice": 152000.0,
        "note": "bom hang neu xau",
        "deliveryAddress": null,
        "orderLines": [
            {
                "id": 24,
                "item": {
                    "id": 1,
                    "quantity": 0,
                    "itemImage": "https://th.bing.com/th/id/OIG.i9WxgobTEXExQ0tmdae9?pid=ImgGn",
                    "price": 10000000,
                    "lastUpdate": "2023-11-17T02:40:07.466+0000",
                    "product": {
                        "id": 1,
                        "categories": [
                            {
                                "id": 1,
                                "name": "Đồ mỹ nghệ",
                                "imageIcon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png",
                                "orderShow": 1
                            }
                        ],
                        "name": "Sập thờ mới nhất 2023",
                        "description": "Đẳng cấp Nội thất hiện đại",
                        "productImages": [
                            "https://down-vn.img.susercontent.com/file/07a6c8254abb2f3425d45f2de86f510b",
                            "https://down-vn.img.susercontent.com/file/46523f1724e0d4aafcce6ab27a8271cb"
                        ],
                        "productThumb": "https://dogovannguu.com/wp-content/uploads/2023/04/Sap-tho-Go-Huong-Da-Tu-Linh-ST17-1.jpg",
                        "showedPrice": 23000000,
                        "attributes": {
                            "Xuất xứ": "Việt Nam"
                        },
                        "variants": [
                            {
                                "id": 1,
                                "variantOptions": [
                                    {
                                        "id": 1,
                                        "value": "Đỏ"
                                    },
                                    {
                                        "id": 2,
                                        "value": "Xanh"
                                    }
                                ],
                                "name": "Màu"
                            }
                        ],
                        "createDate": "2023-11-17T02:40:07.466+0000",
                        "lastUpdate": "2023-11-17T02:40:07.466+0000",
                        "status": "ACTIVE",
                        "paidCount": 5,
                        "paidCountSixMonthAgo": 5,
                        "averageRating": 5.0,
                        "volume": 3.0
                    },
                    "variantOptions": [
                        {
                            "id": 1,
                            "value": "Đỏ"
                        }
                    ],
                    "status": "ACTIVE"
                },
                "quantity": 4,
                "price": 10000000
            }
        ],
        "orderTotal": 39552000,
        "orderStatus": "COMPLETE",
        "method": "PAYMENT_ONLINE",
        "paidPrice": 0,
        "promotionCode": "CTKM1",
        "orderDate": "2023-11-23T12:47:52.884+0000"
    }
]

  constructor(
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly orderService: OrderService,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router,
    
    private readonly route: ActivatedRoute,
  ) {
    this.itemOrder = new Order();
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id){
      this.getListByPaging();
      this.testData();
    }
  }
 
  public test : any;
  testData(){
    for(let i=0;i<this.testdata.length;i++){
      if(this.testdata[i].id == this.id){
        this.test = this.testdata[i].orderLines;
        for(let j=0;j<this.testdata[i].orderLines.length;j++){
          this.variants = this.testdata[i].orderLines[j].item.product.variants;
          this.mappedVariants = this.variants.flatMap((variant: { name: any; variantOptions: any[]; }) => {
            const variantName = variant.name;
            const variantOptions = variant.variantOptions.map(option => option.value);
            return variantOptions.map(option => `${variantName}-${option}`);
          });
        }
      } 
    }
  }

  dataOrder : any;
  getListByPaging() {
    this.orderService.getListOrderByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstOrder = res.data.elements;
        for(let i=0;i<res.data.elements.length;i++){
          if(res.data.elements[i].id == this.id){
            this.dataOrder = res.data.elements[i];
            this.data = res.data.elements[i].orderLines;
            for(let j=0;j<res.data.elements[i].orderLines.length;j++){
              this.variants = res.data.elements[i].orderLines[j].item.product.variants;
              this.mappedVariants = this.variants.flatMap((variant: { name: any; variantOptions: any[]; }) => {
                const variantName = variant.name;
                const variantOptions = variant.variantOptions.map(option => option.value);
                return variantOptions.map(option => `${variantName}-${option}`);
              });
            }
          }
        }
      }
      else {
        this.lstOrder = new Array<Order>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
      }
      
    })
  }
  

  onReturnPage(url: string) : void {
    this.router.navigate([url]);
  }


  onBack(event: Event) {
    let isShow = true;

    if (isShow) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: "Bạn có muốn quay lại?",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate(['category/order/list']);
        },
        reject: () => {
            return;
        }
      });
    } else {
      this.router.navigate(['category/order/list']);
    }
  }
}
