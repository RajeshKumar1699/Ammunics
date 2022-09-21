import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {

  constructor(private http: HttpClient, private router: Router) { }
  isShown: boolean = false;


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer xx,yy,zz'
      }
    })
    return next.handle(tokenizedReq)

  }

  message: any;
  inout: any;

  setMessage(data: any) {
    this.message = data
  }
  getMessage() {
    return this.message
  }

  setInOut(data1: any) {
    this.inout = data1
  }
  getInOut() {
    return this.inout
  }



  postUser(data: any) {
    return this.http.post<any>("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8", data);
  }
  getUser() {
    return this.http.get<any>("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8");
  }

  putUser(data: any, id: number) {
    return this.http.put<any>("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8" + id, data);

  }
  deleteUser(id: number) {
    return this.http.delete<any>("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8" + id);
  }



}
