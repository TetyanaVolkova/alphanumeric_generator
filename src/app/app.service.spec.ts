import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { AppService } from './app.service';
import { throwError, Observable, Subscription } from 'rxjs';


import { HttpClientModule, HttpEvent, HttpHandler, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

export abstract class AbstractMockObservableService {
  protected _subscription: Subscription;
  protected _fakeContent: any;
  protected _fakeError: any;

  set error(err) {
    this._fakeError = err;
  }

  set content(data) {
    this._fakeContent = data;
  }

  get subscription(): Subscription {
    return this._subscription;
  }

  subscribe(next: Function, error?: Function, complete?: Function): Subscription {
    this._subscription = new Subscription();
    spyOn(this._subscription, 'unsubscribe');

    if (next && this._fakeContent && !this._fakeError) {
      next(this._fakeContent);
    }
    if (error && this._fakeError) {
      error(this._fakeError);
    }
    if (complete) {
      complete();
    }
    return this._subscription;
  }
}

describe('Service: AppService', () => {
  let appService: AppService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let location: Location;
  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule,
                    RouterTestingModule,
                    RouterModule,],
          providers: [{AppService,
                      HttpClient,
                      provide: Router,
                      useClass: class {
                        navigate = jasmine.createSpy('navigate');
                      }}
                    ]
      });
      location = TestBed.get(Location);
      router = TestBed.get(Router);
      // Returns a service with the MockBackend so we can test with dummy responses
      appService = TestBed.get(AppService);
      router = TestBed.get(Router);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(appService).toBeTruthy();
  });

  it('expects service to fetch data', fakeAsync(()  => {
    const service = TestBed.get(AppService);
      service.submit('123', '10', '0');
      tick(3500);
      // service.combinations.next([{value: '123', id: 1}, {value: '1a', id: 2}]);
      service.getCombUpdateListener().subscribe( val => {
        console.log(val);
      });
  }));
});
