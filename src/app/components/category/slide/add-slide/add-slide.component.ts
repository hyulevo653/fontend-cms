import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonService } from 'src/app/services/common.service';
import { SlideService } from 'src/app/services/slide.service';
import { AppMessageResponse, ValueSlide } from 'src/app/shared/constants/app.constants';
import { ResApi } from 'src/app/viewModels/res-api';

@Component({
  selector: 'app-add-slide',
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.scss']
})
export class AddSlideComponent {
  fSlide : any;
  id : any;
  public isImageSelected: boolean = false; 
  lstValue = ValueSlide;
  uploadedImageUrl: string = '';
  public data : any;
  slideValue: any;
  public dataSlide : any;
  public loading = [false]
  public nameFile : string = '';

  constructor(
    private slideService : SlideService,
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
    this.fSlide = this.fb.group({
      // id: [''],
      name: ['' , Validators.required],
      keyValue: [],
      imageUrl : [''],
    })
  }


  markAllAsDirty() {
    Object.keys(this.fSlide.controls).forEach(key => {
      const control = this.fSlide.get(key);
      if (control.enabled && control.invalid) {
        control.markAsDirty();
      }
    });
  }
  onSubmit() {
    if(this.fSlide.invalid){
      this.markAllAsDirty();
    }else{
      if(!this.fSlide.get('name').value) {
        this.messageService.add({severity: 'error', summary:'Error', detail: 'Tên Slide không được để trống!'})
        return
      }
      if(this.id == null) {
        const reqData = {
          name: this.fSlide.get('name').value,
          imageUrl: this.nameFile, 
          keyValue: {
            type: this.slideValue,
            value: this.fSlide.get('keyValue').value,
          },
        };
        this.loading[0] = true;
        this.slideService.createSlider(reqData).subscribe((res: ResApi) => {
          this.loading[0] = false;
          if (res && res.status >= 200 && res.status <= 300) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message || AppMessageResponse.CreatedSuccess });
  
            setTimeout(() => {this.onReturnPage('/category/slide/list')}, 1500);
          }
          else {
            this.loading[0] = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || AppMessageResponse.BadRequest });
          }
        },
        () => {
          this.loading[0] = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessageResponse.BadRequest }) },
        () => {this.loading[0] = false} 
        ) 
      }
      else{
        const reqData = Object.assign({}, this.fSlide.value);
        reqData.imageUrl = this.dataSlide.imageUrl;
        this.uploadedImageUrl = this.dataSlide.imageUrl;
        this.loading[0] = true;
        this.slideService.updateSlider(this.id, reqData).subscribe((res: ResApi) => {
          this.loading[0] = false;
          if(res && res.status >= 200 && res.status <= 300) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: AppMessageResponse.CreatedSuccess });
  
            setTimeout(() => {this.onReturnPage('/category/slide/list')}, 1500);
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
      this.slideService.getSliderById(id).subscribe((res: ResApi) => {
        this.isImageSelected=true;
        if(res && res.status >= 200 && res.status <= 300) {
          this.dataSlide = res.data;
          this.dataSlide.imageUrl = res.data.imageUrl;
          this.formGroup();
          this.uploadedImageUrl = res.data.imageUrl;
        }
        else {
          this.dataSlide = [];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.message|| AppMessageResponse.BadRequest });
        }
      }) 
      this.dataSlide={...this.dataSlide}
    }else{
      this.dataSlide = []
    }
  }

  formGroup(){
    this.fSlide = this.fb.group({
      name : this.dataSlide.name,
      id: this.dataSlide.id,
      imageUrl: this.dataSlide.imageUrl,
      keyValue: this.dataSlide.keyValue,
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('type', 'image'); 
      formData.append('file', file)
  
      this.http.post('http://localhost:9214/api/v1/ecommerce/upload/file', formData)
        .subscribe(
          (response: any) => {
            this.isImageSelected = true;
            const uploadedImageName = response.data;
            this.nameFile = uploadedImageName;
            // this.dataSlide.imageIcon = uploadedImageName;
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
    setTimeout(() => {this.onReturnPage('/category/slide/list')}, 500);
  }
}
