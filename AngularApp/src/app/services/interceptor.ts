import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpInterceptorFn } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// @Injectable()
// export class AuthencationInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         console.log("intercepting");
//         const token = localStorage.getItem('jwtToken');
        
//         if (token){
//             req = req.clone({
//                 setHeaders: {Authorization: `Bearer ${token}`}
//             });
//         }

//         return next.handle(req);
//     }
// }

export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
    console.log("intercepting");

    const token = localStorage.getItem('jwtToken');
        
        if (token){
            req = req.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }

    return next(req)
}