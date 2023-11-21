import { NgModule } from '@angular/core';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { EmptyComponent } from './components/shared/empty/empty.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './shared/services/data.service';
import { StorageService } from './shared/services/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { AppInterceptor } from './shared/interceptors/app.interceptor';

@NgModule({
    declarations: [
        AppComponent, 
        NotfoundComponent,
        EmptyComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        AppLayoutModule,
        //CategoryModule
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        },
        DataService,
        CookieService,
        StorageService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
