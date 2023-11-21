import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddressService } from 'src/app/services/address.service';
import { DbAddress } from 'src/app/viewModels/address/address';
import { Paging } from 'src/app/viewModels/paging';
import { Location } from '@angular/common';



@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {
  address!: DbAddress;
  public itemAddress: DbAddress | undefined;
  public filterCode: Paging;
  public filterAddress: Paging;
  public filterParrams : Paging ;

  public addressCode: any;
  fAddress: any;
  public loading = [false];
  lstAddressCode: any[];
  lstAddressName: {};
  lstAddress: any[];
  event: any;
  constructor(
    private readonly addressService: AddressService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private location: Location

  ) {
    this.address = new DbAddress();
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.page_size = 10;
    this.itemAddress = new DbAddress();

    this.filterCode = new Object as Paging;

    this.filterAddress = new Object as Paging;

    this.lstAddress = [];
    this.lstAddressCode = [];
    this.lstAddressName = {};


  }
  onSubmit(){
  }
  onBack(): void {
    this.location.back();
  }
}
