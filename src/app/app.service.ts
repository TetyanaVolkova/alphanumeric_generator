import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AppService {
  public combinations = new Subject();

  constructor(private http: HttpClient,
              private router: Router) {
                this.combinations.subscribe( val => {
                  console.log(val);
                });
              }

  getCombUpdateListener() {
    return this.combinations.asObservable();
  }
  submit(phone: any, limit: string, pageIndex: string) {
    const data = {
      limit: limit || '5',
      pageIndex: pageIndex || '0',
      validPhone: phone
     };
     const config = {
     params: data
     };
    this.http
    .get('http://localhost:3000/phone', config)
    .subscribe(response => {
      console.log(response[0]);
      this.combinations.next(response);
    });
  }
}
