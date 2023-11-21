import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paging } from 'src/app/viewModels/paging';
import { ResApi } from 'src/app/viewModels/res-api';
import { MessageService } from 'primeng/api';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbAddress } from 'src/app/viewModels/address/address';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';



@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public filterParrams: Paging;
  public first = 0;
  public rows = 10;
  public lstAddress: Array<DbAddress>;
  public filterAddress: Paging;
  public filterCode: Paging;
  public lstCode: any[];
  public filterText : string;
 
  // filterLocationCode:  any[] ;
  searchAddressCode: string = '';

  // public lstAddress: any[];
  

  constructor(
    private readonly addressService: AddressService,
    private readonly messageService: MessageService,

    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private readonly fb: FormBuilder,
  ) {
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.page_size = 100;

    this.lstAddress = new Array<DbAddress>();
    this.filterAddress = new Object as Paging;

    this.filterCode = new Object as Paging;
    this.lstAddress = [];
    this.lstCode = [];
    this.filterText = '';
    
   
  }

  ngOnInit() {
    this.getLstProjectByPaging();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return true;//this.customers ? this.first === this.customers.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return true;//this.customers ? this.first === 0 : true;
  }

  deleteAddress(lstAddress: DbAddress) {

  }
  getLstProjectByPaging() {
    this.addressService.getListAddressByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if(res.meta.error_code == AppStatusCode.StatusCode200) {
        this.lstAddress = res.data;
      }
      else {
        this.lstAddress = new Array<DbAddress>();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
      }
      console.log(res);
    })
  }
  onSearch() {
    console.log(this.filterText);
    this.filterParrams.query = `Name.ToLower().Contains("${this.filterText}") OR Code.ToLower().Contains("${this.filterText}")`;

    this.getLstProjectByPaging();
  }
}
  

