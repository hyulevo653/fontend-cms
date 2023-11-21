import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { AuthService } from 'app/services/auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector, 
    //private authService: AuthService, 
    private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const authService = this.injector.get(AuthService);
        const router = this.injector.get(Router);
        //const token = authService.getToken(TokenEnum.ACCESS_TOKEN) ? authService.getToken(TokenEnum.ACCESS_TOKEN) : '';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRhY3RAdG50ZWNvLnZuIiwianRpIjoiNTAzNzk3MmEtNmZlMy00Yzc3LTlmNzUtYjlmNTY5MGZlZTMyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRudGVjaCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImNvbnRhY3RAdG50ZWNvLnZuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIoMDI0KSA3MzA3IDU1NjYiLCJpZCI6IjEiLCJmdWxsbmFtZSI6IlRudGVjaCIsIlVzZXJJZCI6IjEiLCJVc2VyTWFwSWQiOiIxIiwiUm9sZU1heCI6IjEiLCJSb2xlTGV2ZWwiOiIxIiwiUm9sZUNvZGUiOiJBRE1JTiIsIkFjY2Vzc0tleSI6IkNBUlBBUktJTkdNQU5BR0VSOjEwMDAwMDAwMC1DSERWVlM6MTExMTExMTExLVFMREs6MTExMTExMTExLUNBU0hTRVJWSUNFVVRJTElUSUVTOjExMTExMTExMS1EVktUOjExMTExMTExMS1DQVJQQVJLSU5HOjExMTExMTExMS1DQVNIOjExMTExMTExMS1SRUdJU1RFUl9SRVNJREVOVF9DQVJEOjExMTExMTExMS1EU1BEVjoxMTExMTExMTEtUUxORDoxMTExMTExMTEtRFNEQToxMTExMTExMTEtTEg6MTExMTExMTExLURTUEI6MTExMTExMTExLVlDSFQ6MTExMTExMTExLURTVEI6MTExMTExMTExLURTTFNUQjoxMDAwMDAwMDAtQkNZQ0hDOjExMTExMTExMS1UQlA6MTExMTExMTExLVFMQk1UQjoxMTExMTExMTEtUUxRRzoxMTExMTExMTEtRFNDVjoxMTExMTExMTEtRFNUTjoxMTExMTExMTEtTkRCUUw6MTExMTExMTExLURWQzoxMTExMTExMTEtUkVHSVNUUkFUSU9OX1RSQU5TUE9TVDoxMTExMTExMTEtRFNUQ0RHOjExMTExMTExMS1TRUFSQ0hGRUU6MTExMTExMTExLURWVlM6MTExMTExMTExLVVUSUxJVElFUzoxMTExMTExMTEtRFZDVE46MTExMTExMTExLUJDVFQ6MTExMTExMTExLVJFR0lTVFJBVElPTl9DT05TVFJVQ1RJT046MTExMTExMTExLU5EQ0Q6MTExMTExMTExLURTVDoxMTExMTExMTEtRE1EQToxMTExMTExMTEtRFNOVjoxMTExMTExMTEtUUxUVFA6MTExMTExMTExLVFMUUg6MTExMTExMTExLVFUVEI6MTExMTExMTExLURNU1RDRDoxMTExMTExMTEtRFNDSDoxMTExMTExMTEtUUxROjExMTExMTExMS1DT01NT046MTExMTExMTExLUNIVUREVlRCTjoxMTExMTExMTEtQ0hTTEE6MTExMTExMTExLUNIVFQ6MTExMTExMTExLURNQlFMOjExMTExMTExMS1RTENOOjExMTExMTExMS1RTENEOjExMTExMTExMS1TVENEOjExMTExMTExMS1RTFBYOjExMTExMTExMS1QQVlNRU5UOjExMTExMTExMS1EU1RJOjEwMDAwMDAwMC1MSEJRTDoxMTExMTExMTEtVFRITDoxMTExMTExMTEtWUNIVE1BTkFHRVI6MTExMTExMTExLURTRFY6MTAwMDAwMDAwLVFMSFQ6MTExMTExMTExLURTRFZDSDoxMTExMTExMTEtQ0hEVjoxMTExMTExMTEtQkFOTkVSOjExMTExMTExMS1CQ1NNUzoxMTExMTExMTEtQ09ORklHX1VUSUxJVElFUzoxMTExMTExMTEtRERLVDoxMDAwMDAwMDAtTlRCREtDSEhWUjowMDAwMDAwMDAiLCJMYW5ndWFnZUlkIjoiMSIsIlByb2plY3RJZCI6IjAiLCJUeXBlIjoiMSIsIkRlcGFydG1lbnRJZCI6IiIsIlBvc2l0aW9uSWQiOiIiLCJleHAiOjE2ODQ4OTI0NTIsImlzcyI6Imh0dHBzOi8vYXBpazhzMS5jbnR0dmlldG5hbS5jb20udm4vIiwiYXVkIjoiaHR0cHM6Ly9hcGlrOHMxLmNudHR2aWV0bmFtLmNvbS52bi8ifQ.4VxFjsYbTX3HI9cPjZsQZhfIOr6dIab_9XqqLBEFndU';

        const reqHeader = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(reqHeader).pipe(
          map((res: any) => {
            return res;
          }),
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {

              if (this.router.url != '/auth/login') {
                //this.authService.logout();
                //this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.router.url}});
              }
            }

            const error = err.message || err.statusText;

            return throwError(error);
          }),
        );
  }
}
