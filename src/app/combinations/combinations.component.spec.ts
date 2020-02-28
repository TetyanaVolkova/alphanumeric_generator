import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {Injectable, inject} from '@angular/core';
import { CombinationsComponent } from './combinations.component';
import { RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppService } from '../app.service';
import { HttpClientModule,
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
class TestHttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        return new Observable<any>(observer => {
            observer.next({} as HttpEvent<any>);
        });
  }
}
describe('CombinationsComponent', () => {
  let component: CombinationsComponent;
  let fixture: ComponentFixture<CombinationsComponent>;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinationsComponent ],
      imports: [RouterModule.forRoot([]),
                BrowserAnimationsModule,
                HttpClientModule,
                MatButtonModule,
                MatCardModule,
                MatPaginatorModule,
                MatProgressSpinnerModule,
                MatToolbarModule],
      providers: [HttpClientModule,
                  HttpTestingController,
                  HttpClientTestingModule,
                  AppService ]
    })
    .compileComponents();
    service = TestBed.get(AppService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

// Mock localStorage
  beforeEach(() => {
    spyOn(service.getCombUpdateListener(), 'subscribe')
    .and
    .returnValue({value: '1 2', id: 1});
    spyOn(service, 'submit');
    let store = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  it('should set an Item', () => {
    localStorage.setItem('foo', 'bar');
    expect(localStorage.getItem('foo')).toBe('bar'); // bar
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects service to fetch data', fakeAsync(()  => {
    const combinations = [
      {value: '1 2', id: 1}, {value: '1 a', id: 2}, {value: '1 b', id: 3}, {value: '1 c', id: 4}
    ];
      localStorage.setItem('validPhone', '123');
      service.submit('12', '10', '0');
      tick();
      console.log(component.combinations);
      // const result = [];
      // const expectedResult = ['11', '1a', '1b', '1c'];
      service.getCombUpdateListener()
      .subscribe(val => {
        console.log('val');
      });


      // expect(result).toEqual(expectedResult);
      // expect(component.combinations).toEqual(combinations);
    }));
});
