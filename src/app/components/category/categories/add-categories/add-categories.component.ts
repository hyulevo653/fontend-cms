import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CommonService } from 'src/app/services/common.service';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent {
  fCategory : any;
  id : any;
  public isImageSelected: boolean = false; 
  uploadedImageUrl: string = '';
  public data : any;
  public dataCate : any;
  public loading = [false]
  public nameFile : string = '';

  constructor(
    private categoryService : CategoriesService,
    private http: HttpClient,

    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private router: Router,
    
    private readonly route: ActivatedRoute,
  ) {
    

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id =  params.get('id');
    });
    if(this.id){
      this.getCategoriesyId(this.id)
    }
    this.fCategory = this.fb.group({
      // id: [''],
      name: ['' , Validators.required],
      orderShow: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      imageIcon : [''],
    })
  }


  markAllAsDirty() {
    Object.keys(this.fCategory.controls).forEach(key => {
      const control = this.fCategory.get(key);
      if (control.enabled && control.invalid) {
        control.markAsDirty();
      }
    });
  }
  onSubmit() {
    if(this.fCategory.invalid){
      this.markAllAsDirty();
    }else{
      if(!this.fCategory.get('name').value) {
        this.messageService.add({severity: 'error', summary:'Error', detail: 'Tên Category không được để trống!'})
        return
      }
      if(this.id == null) {
        const reqData = Object.assign({}, this.fCategory.value);
        reqData.imageIcon = this.nameFile;
        this.loading[0] = true;
        this.categoryService.createCategory(reqData).subscribe((res: ResApi) => {
          this.loading[0] = false;
          if (res && res.status >= 200 && res.status <= 300) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res?.meta?.error_message || AppMessageResponse.CreatedSuccess });
  
            setTimeout(() => {this.onReturnPage('/category/project/list')}, 1500);
          }
          else {
            this.loading[0] = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
          }
        },
        () => {
          this.loading[0] = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest }) },
        () => {this.loading[0] = false} 
        ) 
      }
      else{
        const reqData = Object.assign({}, this.fCategory.value);
        reqData.imageIcon = this.dataCate.imageIcon;
        this.uploadedImageUrl = this.dataCate.imageIcon;
        this.loading[0] = true;
        this.categoryService.updateCategories(this.id, reqData).subscribe((res: ResApi) => {
          this.loading[0] = false;
          if(res && res.status >= 200 && res.status <= 300) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: AppMessageResponse.CreatedSuccess });
  
            setTimeout(() => {this.onReturnPage('/category/categories/list')}, 1500);
          }
          else {
            this.loading[0] = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message|| AppMessageResponse.BadRequest });
          }
        },
        () => {
          this.loading[0] = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest }) },
        () => {this.loading[0] = false} 
        )
      }
    }
  }

  
  onReturnPage(url: string) : void {
    this.router.navigate([url]);
  }
  getCategoriesyId(id: number) {    
    if(this.id != 0) {
      this.categoryService.getCategoriesById(id).subscribe((res: ResApi) => {
        this.isImageSelected=true;
        if(res && res.status >= 200 && res.status <= 300) {
          this.dataCate = res.data;
          this.dataCate.imageIcon = res.data.imageIcon;
          this.formGroup();
          this.uploadedImageUrl = res.data.imageIcon;
        }
        else {
          this.dataCate = [];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.meta?.error_message || AppMessageResponse.BadRequest });
        }
      }) 
      this.dataCate={...this.dataCate}
    }else{
      this.dataCate = []
    }
  }

  formGroup(){
    this.fCategory = this.fb.group({
      name : this.dataCate.name,
      id: this.dataCate.id,
      imageIcon: this.dataCate.imageIcon,
      orderShow: this.dataCate.orderShow,
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image'); 
      formData.append('file', file)
  
      this.http.post('http://localhost:9214/api/v1/upload/file', formData)
        .subscribe(
          (response: any) => {
            this.isImageSelected = true;
            const uploadedImageName = response.data;
            this.nameFile = uploadedImageName;
            // this.dataCate.imageIcon = uploadedImageName;
            console.log('Upload thành công:', response);
            this.uploadedImageUrl = uploadedImageName;
          },
          (error) => {
            console.error('Lỗi upload:', error); 
          }
        );
    }
  }
  Imagenull(){
    this.isImageSelected = false;
    this.nameFile = '';
    this.uploadedImageUrl = '';
  }
  onBack(event:any){
    setTimeout(() => {this.onReturnPage('/category/categories/list')}, 1500);
  }
}
