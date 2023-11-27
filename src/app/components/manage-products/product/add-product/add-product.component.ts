import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { Categories } from 'src/app/viewModels/categories/categories';
import { Paging } from 'src/app/viewModels/paging';
import { ItemRequest, Product, VariantRequests } from 'src/app/viewModels/product/product';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  fProduct : any;
  // fItemRequest : FormGroup;
  new_lstVariant : any;
  public lstVariant: any;
  lstCategory: any;
  currentDate = new Date();
  public isImage: boolean = false;
  categoryIds: any;
  public loading = [false]
  uploadedImageUrl: string = '';
  public nameFile : string = '';
  id: any;
  public isImageSelected: boolean = false; 
  uploadedImages: string[] = [];
  variantName : string[] = [];
  variantValues : string[][] = [];
  productImages: any;
  filterParrams: Paging;
  public nameItem : string[] = [];
  public valueItem : string[] = [];
  userInputs: any[] = [];
  public itemRequests : any[]= [];
  dataItem: any;
  public urlImageProducts : any;
  i : any;
  data:any;
  combinations: string[][] = [];
  constructor(
    private readonly productService : ProductService,
    private readonly categoryService : CategoriesService,
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private http : HttpClient,
    
    private readonly route: ActivatedRoute,
  ) {
    this.lstVariant = new Array<VariantRequests>();
    this.itemRequests = new Array<ItemRequest>();
    this.filterParrams = new Object as Paging;
    this.filterParrams.page = 1;
    this.filterParrams.size = 10;
    this.new_lstVariant = [];
    this.lstCategory = new Array<Categories>();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id){
      this.getVariant();
      this.getProductbyId(this.id)
      this.getItembyId(this.id)
    }
    // this.getVariant();
    this.getListCategoryByPaging();
    this.fProduct = this.fb.group({
      // id: [''],
      // name: ['' , Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(150)])],
      name: ['',Validators.required],
      description : ['',Validators.required],
      volume: [''],
      thumb : [''],
      productImages : [],
      price: [''],
      categoryIds: [],
      itemRequests: [],
      attributes: [],
      variantRequests: [],
    })
  }


  onSubmit(){
    if(this.id == null){
      const reqData = Object.assign({}, this.fProduct.value);
      this.buildItemRequests();
      // reqData.categoryIds = this.categoryIds.filter((i: any) => i).map((item: any) => ({item}));
      reqData.categoryIds = this.lstCategory.map((item: any) => item.id);
      reqData.variantRequests = this.lstVariant.map((item: any) => {
        return {
          variantName: item.variantName,
          variantValues: item.variantValues.split(',').map((value: string) => value.trim())
        };
      });
      reqData.itemRequests = this.itemRequests;
      reqData.productImages = reqData.productImages.toString().split(",");
      reqData.attributes = {
        "Xuất xứ": this.fProduct.get('attributes').value
      };
      this.loading[0] = true;
      this.productService.createProduct(reqData).subscribe(
        (res: any) => {
          this.loading[0] = false;
          if (res && res.status >= 200 && res.status <= 300) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.CreatedSuccess });
            
            setTimeout(() => {this.onReturnPage('/manager-product/product/list')}, 1000);
          } 
    })} else {
      const reqData = Object.assign({}, this.fProduct.value);
      reqData.categoryIds = this.lstCategory.map((item: any) => item.id);
      reqData.variantRequests = this.lstVariant.map((item: any) => {
        return {
          variantName: item.variantName,
          variantValues: item.variantValues.split(',').map((value: string) => value.trim())
        };
      });
      reqData.itemRequests = this.itemRequests;
      reqData.productImages = reqData.productImages.toString().split(",");
      reqData.attributes = {
        "Xuất xứ": this.fProduct.get('attributes').value
      };
      this.loading[0] = true;
      this.productService.updateProduct(this.id, reqData).subscribe(
        (res: any) => {
          this.loading[0] = false;
          if (res && res.status >= 200 && res.status <= 300) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.UpdatedSuccess });

            setTimeout(() => {this.onReturnPage('/manager-product/product/list')}, 1500);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
          }
        },
        () => {
          this.loading[0] = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest });
        },
        () => {
          this.loading[0] = false;
        }
      );
    }
  }

  onReturnPage(url: string) : void {
    this.router.navigate([url]);
  }

  getProductbyId(id: number) {    
    if(this.id != 0) {
      this.productService.getProductById(id).subscribe((res: ResApi) => {
        if(res.status == AppStatusCode.StatusCode200) {
          this.data = res.data;
          this.productImages = this.data.productImages.join('\n');
          this.categoryIds = this.data.categories.filter((i: any) => i).map((item: any) => item.id);
          this.lstVariant = this.processVariants(this.data.variants);
          this.formGroup();
        }
        else {
          this.data = [];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
        }
      }) 
      this.data={...this.data}
    }else{
      this.data = []
    }
  }

  getItembyId(id: number) {    
    if (this.id != 0) {
      this.productService.getItemProById(id).subscribe((res: ResApi) => {
        if (res.status == AppStatusCode.StatusCode200) {
          this.dataItem = res.data;
          const listName = this.lstVariant.map((item: any) => item.variantName);
          
          // Reset userInputs array
          this.userInputs = new Array(this.combinations.length).fill({ image: '', price: '', quantity: '' });
  
          for (let rowIndex = 0; rowIndex < this.combinations.length; rowIndex++) {
            const ss = this.combinations[rowIndex];
            var itemVariantOption: any = {};
  
            for (var j = 0; j < ss.length; j++) {
              itemVariantOption[listName[j]] = ss[j];
            }
  
            // Set values for userInputs at the current rowIndex
            this.userInputs[rowIndex].image = this.dataItem.itemImage;
            this.userInputs[rowIndex].price = this.dataItem.price;
            this.userInputs[rowIndex].quantity = this.dataItem.quantity;
          }
        } else {
          this.dataItem = [];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
        }
      });
      this.dataItem = { ...this.dataItem };
    } else {
      this.dataItem = [];
    }
  }

  processVariants(variants: any[]): any[] {
    return variants.reduce((acc, variant) => {
      if (variant.name && variant.variantOptions && variant.variantOptions.length > 0) {
        const variantEntry = {
          variantName: variant.name,
          variantValues: variant.variantOptions.map((option: { value: any; }) => option.value),
        };
        acc.push(variantEntry);
      }
      return acc;
    }, []);
  }
  formGroup(){
    this.fProduct = this.fb.group({
      id:  this.id,
      name: this.data.name,
      description: this.data.description,
      volume: this.data.volume,
      thumb: this.data.productThumb,
      price: this.data.showedPrice,
      status : this.data.status,
      productImages: '',
      attributes : this.convertObjectToString(this.data.attributes),
    })
  }
  convertArrToString(obj: any): string {
    return JSON.stringify(obj);
  }
  
  convertObjectToString(obj: any): string {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  }

  getListCategoryByPaging() {
    this.categoryService.getListByPaging(this.filterParrams).subscribe((res: ResApi) => {
      if (res && res.status >= 200 && res.status <= 300) {
        this.lstCategory = res.data;
      }
      else {
        this.lstCategory = new Array<Categories>();
      }
      
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image');
      formData.append('file', file);
  
      this.http.post('http://localhost:9214/api/v1/upload/file', formData)
        .subscribe(
          (response: any) => {
            const uploadedImageName = response.data;
            this.uploadedImages.push(uploadedImageName); 
            this.updateInputValue();  
            console.log('Upload thành công:', response);
          },
          (error) => {
            console.error('Lỗi upload:', error);
          }
        );
    }
  }
  onImage(event: any,index:number) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image');
      formData.append('file', file);
  
      this.http.post('http://localhost:9214/api/v1/upload/file', formData)
        .subscribe(
          (response: any) => {
            const uploadedImageName = response.data;
            this.isImage = true;

            this.combinedData[index].userInput.image = response.data;
            console.log(response.data);
            console.log('Upload thành công:', response);
          },
          (error) => {
            console.error('Lỗi upload:', error);
          }
        );
    }
  }
  onMultiFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image');
      formData.append('file', file);
  
      this.http.post('http://localhost:9214/api/v1/upload/file', formData)
        .subscribe(
          (response: any) => {
            const uploadedImageName = response.data;
            this.uploadedImages.push(uploadedImageName); 
            this.updateImageValue();  
            console.log('Upload thành công:', response);
          },
          (error) => {
            console.error('Lỗi upload:', error);
          }
        );
    }
  }

  tableVisible = false;

  // Các biến thể và hàm generateValues giữ nguyên

  showTable() {
    this.tableVisible = true;
  }

  getVariantValues(): string[][] {
    return this.lstVariant.map((variant: { variantValues: any; }) => variant.variantValues.split(','));
  }
  public combinedData : any
  getVariant() {
    const variantValuesLists = this.getVariantValues();
    this.combinations = this.generateCombinations(variantValuesLists);
    this.userInputs = this.generateUserInput(this.combinations);
    this.combinedData = this.combineData(this.combinations, this.userInputs);
  }
  generateUserInput(combinations: any): any[] {
    var userInputCustoms : any[] = []; 
    for (let i = 0; i < this.combinations.length; i++) {
      userInputCustoms.push({
        quantity: 0,
        image: '', // Set this to the appropriate default value
        price: 0
      });
    }
    return userInputCustoms;
  }

  combineData(combinations: any[], userInputs: any[]): any[] {
    // Combine combinations and userInputs into a single array
    // You may need to adjust the structure based on your specific needs
    const combinedData = combinations.map((combination, index) => ({
      combination,
      userInput: userInputs[index]
    }));
  
    return combinedData;
  }
  
  generateCombinations(lists: string[][]): string[][] {
    const result: string[][] = [];
  
    const helper = (current: string[], index: number): void => {
      if (index === lists.length) {
        result.push([...current]);
        return;
      }
  
      for (const value of lists[index]) {
        current.push(value);
        helper(current, index + 1);
        current.pop();
      }
    };
  
    helper([], 0);
  
    return result;
  }
 
  updateImageValue() {
    const joinedValues = this.uploadedImages.join(', ');
    this.fProduct.controls['productImages'].setValue(joinedValues);
  }

  buildItemRequests(): any[] {
    const listName = this.lstVariant.map((item:any) => item.variantName);

    for (let rowIndex = 0; rowIndex < this.combinations.length; rowIndex++) {
      var itemVariantOption: any = {};

      const ss = this.combinations[rowIndex]; 
      for (var j = 0; j < ss.length; j++) {
          itemVariantOption[listName[j]] = ss[j];
          console.log(itemVariantOption);
      }

      

      const userInputsForRow = this.userInputs[rowIndex] || {};

      const itemRequest = {
        quantity: userInputsForRow.quantity || 0,
        image: userInputsForRow.image || this.fProduct.get('thumb').value, // Set this to the appropriate value
        price: userInputsForRow.price || 0,
        itemVariantOption: itemVariantOption,
      };

      // for (let i = 0; i < this.lstVariant.length; i++) {
      //   const variantName = this.lstVariant[i].variantName;
      //   const variantValue = this.combinations[rowIndex][i];

      //   itemRequest.itemVariantOption[variantName] = variantValue;
      // }

      this.itemRequests.push(itemRequest);
    }
    return this.itemRequests;
  }


  updateInputValue() {
    const joinedValues = this.uploadedImages.join(', ');
    this.fProduct.controls['thumb'].setValue(joinedValues);
  }

  Imagenull(){
    this.isImageSelected = false;
    this.nameFile = '';
    this.uploadedImages = [];
  }
  Imagdel(i:number){
    this.combinedData[i].userInput.image = '';
    this.isImage = false;
  }

  addVariant(id: number) {
    let itemVariant = {
      variantName: "",
      variantValues: [],
    };
    this.lstVariant.push(itemVariant)
  }
  onDeleteVariantRequests(index:number,item:any){
    let lst_updated = [];
  
    for (let i = 0; i < this.lstVariant.length; i++) {
      if (index != i) {
        lst_updated.push(this.lstVariant[i])
      }
    }

    this.lstVariant = [...lst_updated];
  }

  onBack(event:any){
    setTimeout(() => {this.onReturnPage('/manager-product/product/list')}, 1500);
  }
}
