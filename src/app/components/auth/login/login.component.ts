import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppMessageResponse, AppStatusCode } from 'src/app/shared/constants/app.constants';
import { ReqLoginModel } from 'src/app/view-models/auth/req-login-model';
// import {Md5} from 'ts-md5';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    loginFormSubmitted = false;
    isLoginFailed = false;
    resMessageLogin = '';
    returnUrl = '/';
    isLogging = false;
    public fLogin: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private readonly fb: FormBuilder,
        private route: Router)
    { 
        this.fLogin = fb.group({
            username: new FormControl('',  Validators.compose([Validators.required, Validators.minLength(5)])),
            password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
            rememberMe: new FormControl(true)
        });
    }

    ngOnInit(): void {
        this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.loginFormSubmitted = true;
        this.isLoginFailed = false;
        const redirectUrl = '/';

        if (this.fLogin.invalid) {
          return;
        }
    
        const reqLogin = new ReqLoginModel();
        reqLogin.username = this.fLogin.value.username;
        reqLogin.password = this.fLogin.value.password;
        // reqLogin.password = Md5.hashStr(this.fLogin.value.password);

        this.isLogging = true;
    
        this.authService.login(reqLogin).subscribe((res : any) => {

            this.isLogging = false;
            
            if (res.status == AppStatusCode.StatusCode200) {
                this.isLoginFailed = false;
                this.resMessageLogin = "Đăng nhập thành công!";
                this.authService.setStoreData(res.data);
                if (redirectUrl) {
                    this.route.navigate([redirectUrl]);
                    //this.redirectUrl = null;
                } else {
                    this.route.navigate(['/']);
                }
            }
            else {
                this.isLogging = false;
                this.isLoginFailed = true;
                this.resMessageLogin = res.message;  
            }
        }, (error) => {
            this.isLogging = false;
                this.isLoginFailed = true;
                this.resMessageLogin = 'Tài khoản hoặc mật khẩu không đúng'; 
            //console.log("check status: ", error.status);
        })
      }
}
