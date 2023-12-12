import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ListTime } from 'src/app/shared/constants/app.constants';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  items!: MenuItem[];

  products!: [];
  public filterParrams: Paging ;
  lstCoutUser: any;
  statusValue: any;
  chartData: any;
  chartOptions: any;
  chartData1: any;
  chartOptions1: any;
  chartData2: any;
  chartOptions2: any;
  lstTime = ListTime;

  chartData3: any;
  chartOptions3: any;
  data: any;

  options: any;

  subscription!: Subscription;

  public product = {
    "status": 200,
    "message": "OK",
    "timestamp": "2023-12-08T16:02:19.377+00:00",
    "data": [
        {
            "productId": 5,
            "productName": "Tượng gỗ mới nhất 2023",
            "view": 1
        },
        {
            "productId": 1,
            "productName": "Sập thờ mới nhất 2023",
            "view": 3
        },
        {
            "productId": 7,
            "productName": "Bàn thờ gỗ mới nhất 2023",
            "view": 2
        },
        {
            "productId": 6,
            "productName": "Bàn thờ gỗ mới nhất 2023",
            "view": 1
        },
        {
            "productId": 3,
            "productName": "Cửa gỗ mới nhất 2023",
            "view": 2
        },
        {
            "productId": 4,
            "productName": "Đồ gỗ mỹ nghệ cao cấp",
            "view": 3
        }
    ]
}

  public dataStatus = {
    "status": 200,
    "message": "OK",
    "timestamp": 1701940815172,
    "data": [
      {
        "status": "PENDING",
        "count": 8
      },
      {
        "status": "COMPLETE",
        "count": 3
      },
      {
        "status": "DELIVERED",
        "count": 2
      },
      {
        "status": "DRAFT",
        "count": 0
      },
      {
        "status": "CONFIRM",
        "count": 0
      },
      {
        "status": "PROCESSING",
        "count": 0
      },
      {
        "status": "SHIPPED",
        "count": 0
      },
      {
        "status": "CANCELED",
        "count": 0
      },
      {
        "status": "RETURNED",
        "count": 0
      },
      {
        "status": "REFUNDED",
        "count": 0
      },
      {
        "status": "FAILED",
        "count": 0
      }
    ]
  }
  public UserActive = {
    "status": 200,
    "message": "OK",
    "timestamp": "2023-12-10T03:40:29.756+00:00",
    "data": [
      {
        "timeline": "00:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "00:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "01:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "02:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "03:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "04:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "05:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "06:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "07:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "08:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:05",
        "dau": "1",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:10",
        "dau": "1",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:15",
        "dau": "1",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:20",
        "dau": "1",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:25",
        "dau": "1",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "09:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:10",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "10:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "10:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:05",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "11:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:15",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "11:20",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "11:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "11:55",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "12:00",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "12:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "12:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "12:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "12:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "12:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "12:30",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "12:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "12:40",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "12:45",
        "dau": "0",
        "yau": "0",
        "wau": "1"
      },
      {
        "timeline": "12:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "12:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "13:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "14:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "15:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "16:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "17:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "18:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "19:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "20:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "21:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "22:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:00",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:05",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:10",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:15",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:20",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:25",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:30",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:35",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:40",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:45",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:50",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      },
      {
        "timeline": "23:55",
        "dau": "0",
        "yau": "0",
        "wau": "0"
      }
    ]
  }
  public CoutActive = {
      "status": 200,
      "message": "OK",
      "timestamp": "2023-12-12T01:56:41.611+00:00",
      "data": {
          "newToday": 0,
          "newYesterday": 5,
          "newThisWeek": 5,
          "newLastWeek": 3,
          "newThisMonth": 8,
          "newLastMonth": 0,
          "newLast30Days": 8,
          "activeToday": 0,
          "activeYesterday": 3,
          "activeThisWeek": 3,
          "activeLastWeek": 4,
          "activeThisMonth": 6,
          "activeLastMonth": 1,
          "activeLast30Days": 6
      }
  }
  userActive: any;
  dataProduct: any;

  constructor(public layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
    });
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;
  }

  ngOnInit() {
    const rawData = {
      "status": 200,
      "message": "OK",
      "timestamp": 1701940672974,
      "data": [
        {
          "categoryName": "Bàn ghế",
          "orderCount": 2,
          "productCount": 1,
          "itemCount": 2,
          "totalOrderAmount": 64079000
        },
        {
          "categoryName": "Cửa gỗ",
          "orderCount": 3,
          "productCount": 2,
          "itemCount": 3,
          "totalOrderAmount": 139058000
        },
        {
          "categoryName": "Đồ mỹ nghệ",
          "orderCount": 4,
          "productCount": 2,
          "itemCount": 3,
          "totalOrderAmount": 114333000
        }
      ]
    };

    const rawData1 = {
      "status": 200,
      "message": "OK",
      "timestamp": "2023-12-08T15:50:56.090+00:00",
      "data": [
        {
          "district": "Hải Hậu",
          "city": "Nam Định",
          "cnt": 1
        },
        {
          "district": "Thạch Thất",
          "city": "Hà Nội",
          "cnt": 3
        },
      ]
    };

    const rawData2 = {
      "status": 200,
      "message": "OK",
      "timestamp": "2023-12-08T16:08:37.967+00:00",
      "data": [
        {
          "dateStamp": "2023-12-08",
          "evtName": "Click Slide",
          "cnt": 2
        },
        {
          "dateStamp": "2023-12-08",
          "evtName": "Login",
          "cnt": 0
        },
        {
          "dateStamp": "2023-12-08",
          "evtName": "Click Account",
          "cnt": 1
        },
        {
          "dateStamp": "2023-11-08",
          "evtName": "Click Home",
          "cnt": 2
        },
        {
          "dateStamp": "2023-10-08",
          "evtName": "View Product",
          "cnt": 1
        },
        {
          "dateStamp": "2023-12-08",
          "evtName": "Click Notification",
          "cnt": 2
        },
        {
          "dateStamp": "2023-12-08",
          "evtName": "Click Cart",
          "cnt": 2
        }
      ]
    }


    this.chartData = {
      labels: rawData.data.map(item => item.categoryName),
      datasets: [
        {
          data: rawData.data.map(item => item.orderCount),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    this.chartData1 = {
      labels: rawData1.data.map(item => `${item.district} - ${item.city}`),
      datasets: [
        {
          label: 'Number of Orders',
          data: rawData1.data.map(item => item.cnt),
          backgroundColor: ['#FF6384', '#36A2EB', /* thêm màu sắc cho các thành phố và huyện khác nếu cần */],
        },
      ],
    };

    this.chartOptions1 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };

    const eventNames = Array.from(new Set(rawData2.data.map(item => item.evtName)));
    const dates = Array.from(new Set(rawData2.data.map(item => item.dateStamp)));

    const datasets = eventNames.map(eventName => {
      return {
        label: eventName,
        data: dates.map(date => {
          const dataPoint = rawData2.data.find(item => item.evtName === eventName && item.dateStamp === date);
          return dataPoint ? dataPoint.cnt : 0;
        }),
        fill: false,
        borderColor: this.getRandomColor(),
      };
    });

    this.chartData2 = {
      labels: dates,
      datasets: datasets,
    };

    this.chartOptions2 = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const timelines = this.UserActive.data.map(item => item.timeline);

    const dataUserActive = [
      {
        label: 'DAU',
        data: this.UserActive.data.map(item => parseInt(item.dau)),
        fill: false,
        borderColor: '#FF6384',
      },
      {
        label: 'YAU',
        data: this.UserActive.data.map(item => parseInt(item.yau)),
        fill: false,
        borderColor: '#36A2EB',
      },
      {
        label: 'WAU',
        data: this.UserActive.data.map(item => parseInt(item.wau)),
        fill: false,
        borderColor: '#FFCE56',
      },
    ];

    this.chartData3 = {
      labels: timelines,
      datasets: dataUserActive,
    };

    this.chartOptions3 = {
      responsive: true,
      maintainAspectRatio: false,
    };


    this.getStatusValue();
    this.getUserActive();
    this.getDataproduct();
    this.getCountUser();
  }

  getCountUser(){
    this.lstCoutUser = this.CoutActive.data;
  }

  getDataproduct(){
    this.dataProduct = this.product.data;
  }

  getStatusValue() {
    // this.dashbroadService.getListEvent().subscribe((res: ResApi) => {
    //   if(res && res.status >= 200 && res.status <= 300) {
    //     this.statusValue = res.data;
    //   }
    // })
    this.statusValue = this.dataStatus.data
  }

  getUserActive() {
    this.userActive = this.UserActive.data;
  }
  logdata(){
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  onSelect(event: any) {

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
