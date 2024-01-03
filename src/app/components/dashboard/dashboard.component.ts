import { Component, OnInit, OnDestroy } from '@angular/core';
import { end } from '@popperjs/core';
import { time } from 'console';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashBoardService } from 'src/app/services/dashbroad.service';
import { StatisticService } from 'src/app/services/statistic.service';
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
  lstCoutUser: any = {};
  statusValue: any[] = [];
  dataPhone: any;
  dataPhoneLocation: any;
  chartData: any;
  chartOptions: any;
  chartDataSP: any;
  chartOptionsSP: any;
  chartData1: any;
  selectedValue: any;
  chartOptions1: any;
  chartData2: any;
  chartOptions2: any;
  lstTime = ListTime;
  totalOrder : any = 0;
  chartOptionsDate: any;
  Genderdata:any;
  GenderdataOptions :any;
  chartData3: any;
  chartOptions3: any;
  data: any;
  orderDateData: any;
  options: any;
  genderResp: any;
  productViewResp: any;
  userActiveResp: any;
  statusOrderResp: any;
  userActiveIntervalResp: any = [];
  subscription!: Subscription;
  orderDateResp: any;
  startDate: any;
  startDateDoanhThu: Date = new Date();
  endDateDoanhThu: Date = new Date();
  endDate : any;
  userActive: any;
  dataProduct: any;
  chartDataItem: any;
  chartDataTotalOrderAmount: any;

  constructor(
    public layoutService: LayoutService,
    private readonly dashboardService : DashBoardService,
    private readonly statisticService : StatisticService
    ) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
    });
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;
    
    console.log(this.selectedValue)
  }

  ngOnInit() {
    const today = new Date();
    // this.endDateDoanhThu = [today, []];
    // this.startDateDoanhThu = [new Date(today.getFullYear(), today.getMonth(), 1), []]; // Ngày đầu tiên của tháng này

    this.endDateDoanhThu = new Date();
    this.startDateDoanhThu = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedValue = '1 minute';
    
    this.CallData();
    // this.getCountUser();
    
    // this.getUserActive();
  }

    CallData(){
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
  
  
      this.chartData = {
        labels: rawData.data.map(item => item.categoryName),
        datasets: [
          {
            data: rawData.data.map(item => item.orderCount),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };
      this.chartDataSP = {
        labels: rawData.data.map(item => item.categoryName),
        datasets: [
          {
            data: rawData.data.map(item => item.productCount),
            backgroundColor: ["#808000", "#008080	", "#000080	"],
          },
        ],
      };
      this.chartDataItem = {
        labels: rawData.data.map(item => item.categoryName),
        datasets: [
          {
            data: rawData.data.map(item => item.itemCount),
            backgroundColor: ["#33CCFF", "#00CC33", "#CC99FF"],
          },
        ],
      };
      console.log(rawData.data)
      this.chartDataTotalOrderAmount = {
        labels: rawData.data.map(item => item.categoryName),
        datasets: [
          {
            type: 'bar',
            data: rawData.data.map(item => item.totalOrderAmount),
            backgroundColor: ["#CC6633", "#66A2EB", "#FF6666"],
          },
        ],
      };
  
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
  
      this.statisticService.getStatisticLocation('').subscribe((res : ResApi) => {
        if (res && res.status >= 200 && res.status < 300) {
          this.chartData1 = {
            labels: res.data.map((item: { district: any; city: any; }) => `${item.district} - ${item.city}`),
            datasets: [
              {
                label: 'Nam Định - Hải Hậu',
                data: res.data.map((item: { cnt: any; }) => item.cnt),
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
        }
      })
      
      
      let req = {
          startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), 
          endDate: new Date() 
      };
      this.statisticService.getStatisticEvent(req).subscribe((res : ResApi) => {
        if (res && res.status >= 200 && res.status < 300) {
          const eventNames = Array.from(new Set(res.data.map((item: { evtName: any; }) => item.evtName)));
          const dates = Array.from(new Set(res.data.map((item: { dateStamp: any; }) => item.dateStamp)));
      
          const datasets = eventNames.map(eventName => {
            return {
              label: eventName,
              data: dates.map(date => {
                const dataPoint = res.data.find((item: { evtName: string; dateStamp: string; }) => item.evtName === eventName && item.dateStamp === date);
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
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
              }],
            },
          };
        }
      })
      
      
  
      this.chartOptions3 = {
        responsive: true,
        maintainAspectRatio: false,
      };
  

    let body = {};
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 ngày trước
    body = {
        startDate: thirtyDaysAgo, 
        endDate: today
    };
      this.getStatisOrder(body);
    
  
      this.chartOptionsDate = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              position: 'left',
              ticks: {
                beginAtZero: true,
              },
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              position: 'right',
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
  
      
      // this.getStatisGender();
      this.statisticService.getStatisticGender().subscribe((res: ResApi) => {
        if (res && res.status >= 200 && res.status <= 300) {
          this.genderResp = res;
          this.Genderdata = {
            labels: this.genderResp.data.map((item : any) => item.gender),
            datasets: [
              {
                data: this.genderResp.data.map((item : any) => item.cnt),
                backgroundColor: ['#FF6384', '#36A2EB'], // Màu sắc cho từng phần trong biểu đồ tròn
              },
            ],
          };
        }
      })
  
  
      this.GenderdataOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
  
  
      this.getStatusValue();
      
      this.getDataproduct();

      this.getCountUser();
    
      this.getUserActive('2 hour');
      
    }

  private getStatisOrder(body: {}) {
    this.statisticService.statisticOrder(body).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status < 300) {
        this.orderDateData = {
          labels: res.data.map((item: { orderDate: any; }) => item.orderDate),
          datasets: [
            {
              type: 'bar',
              label: 'Order Count',
              data: res.data.map((item: { orderCount: any; }) => item.orderCount),
              fill: false,
              borderColor: '#99FF33',
              yAxisID: 'y-axis-1',
              // backgroundColor: 'rgba(255, 99, 132, 0.2)',
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)', // Màu cho cột 1
                'rgba(54, 162, 235, 0.7)', // Màu cho cột 2
                'rgba(255, 206, 86, 0.7)', // Màu cho cột 3
                'rgba(75, 192, 192, 0.7)', // Màu cho cột 4
              ]
            },
            {
              type: 'line',
              label: 'Total Revenue',
              data: res.data.map((item: { totalRevenue: any; }) => item.totalRevenue),
              fill: true,
              borderColor: '#FF6384',
              yAxisID: 'y-axis-2',
            },
          ],
        };
      }
    }, error => {
    });
  }

    getCountUser(){
    this.statisticService.getUserStatistic().subscribe((res : ResApi) => {
      if (res && res.status >= 200 && res.status < 300) {
        this.lstCoutUser = res.data
        console.log(this.lstCoutUser)
      } 
    })
  }

  getDataproduct(){
    let body = {};
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 ngày trước
    body = {
        startDate: thirtyDaysAgo, 
        endDate: today
    };
    this.statisticService.getStatisticViewProduct(body, '').subscribe((res : ResApi) => {
      if (res && res.status >= 200 && res.status < 300) {
        this.dataProduct = res.data;
      }
    })
  }

  statisticDoanhThu(startDateDoanhThu : Date, endDateDoanhThu : Date) {
    console.log(startDateDoanhThu + " _ " + endDateDoanhThu)
    let body = {}; 
    if (startDateDoanhThu == null || endDateDoanhThu == null) {
        return;
    } else {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày đầu tiên của tháng này
      body = {
          startDate: firstDayOfMonth,
          endDate: today 
      };
      this.getStatisOrder(body);
    }
    
  }

  getStatusValue() {
    this.statisticService.statisticOrderStatus().subscribe((res : ResApi) => {
      if (res && res.status > 199 && res.status < 300) {
        this.statusValue = res.data;
        this.totalOrder = res.data.reduce((acc: any, curr: { count: any; }) => acc + curr.count, 0);
        console.log(this.totalOrder);
      }
    })
  }

  SearchProduct(sdt : string, startDate : Date, endDate: Date){
    let body = {}; 
    if (startDate !== null && endDate !== null) {
        body = {
            startDate: startDate, 
            endDate: endDate // 
        };
    } else {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 ngày trước
        body = {
            startDate: thirtyDaysAgo, 
            endDate: today 
        };
    }
    this.statisticService.getStatisticViewProduct(body, sdt).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status < 300) {
        this.productViewResp = res.data;
        this.dataProduct = this.productViewResp;
      }
    })
  }

  ChangeStartDateDoanhThu(event: any) {
    this
    console.log('Ngày mới được chọn:', event);
    // Thực hiện các hành động khác tại đây
  }

  ChangeEndDateDoanhThu(event : any) {
    console.log(event);
  }

  getUserActive(interval: string) {
    this.statisticService.getStatisticUserActiveInterval(interval).subscribe((res : ResApi) => {
      if (res && res.status >= 200 && res.status < 300) {
        this.userActiveIntervalResp = res.data;
        const timelines = this.userActiveIntervalResp.map((item: { timeline: any; }) => item.timeline);
        const dataUserActive = [
          {
            label: 'DAU',
            data: this.userActiveIntervalResp.map((item: { dau: string; }) => parseInt(item.dau)),
            fill: false,
            borderColor: '#FF6384',
          },
          {
            label: 'YAU',
            data: this.userActiveIntervalResp.map((item: { yau: string; }) => parseInt(item.yau)),
            fill: false,
            borderColor: '#36A2EB',
          },
          {
            label: 'WAU',
            data: this.userActiveIntervalResp.map((item: { wau: string; }) => parseInt(item.wau)),
            fill: false,
            borderColor: '#FFCE56',
          },
        ];
        this.chartData3 = {
          labels: timelines,
          datasets: dataUserActive,
        };
        } else {
          console.log("not success");
        }
    }, error => {
      console.log("Co loi xay ra" + error)
    })
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
    console.log(event);
      if (event == null || event.value == null) return;
      this.statisticService.getStatisticUserActiveInterval(event.value).subscribe((res: ResApi) => {
        if (res && res.status >= 200 && res.status < 300) {
          this.getUserActive(event.value);
        }
      })
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
