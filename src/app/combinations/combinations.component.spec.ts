import { ComponentFixture, TestBed, getTestBed, fakeAsync, tick, async, inject } from '@angular/core/testing';
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
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientModule, HttpClient} from '@angular/common/http';

describe('CombinationsComponent', () => {
  let component: CombinationsComponent;
  let fixture: ComponentFixture<CombinationsComponent>;
  let router: Router;
  // let httpMock: HttpTestingController;
  // let injector: TestBed;
    // Mock localStorage
    beforeEach(() => {
      let store = {};
      spyOn(localStorage, 'getItem').and.callFake( key => {
       return store[key] || null;
      });
      spyOn(localStorage, 'removeItem').and.callFake(key =>  {
        delete store[key];
      });
      spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
        return store[key] = <string>value;
      });
      spyOn(localStorage, 'clear').and.callFake(() =>  {
          store = {};
      });
    });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinationsComponent ],
      imports: [RouterTestingModule,
                RouterModule,
                BrowserAnimationsModule,
                HttpClientModule,
                HttpClientTestingModule,
                MatButtonModule,
                MatCardModule,
                MatPaginatorModule,
                MatProgressSpinnerModule,
                MatToolbarModule],
      providers: [
                  {
                    AppService,
                    provide: Router,
                    useClass: class {
                      navigate = jasmine.createSpy('navigate');
                    }
                  }
                ]
    })
    .compileComponents();
    // injector = getTestBed();
    // httpMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(CombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects servise to fatch data', fakeAsync(()  => {
    const pageEvent = {
      previousPageIndex: 1,
      pageIndex: 0,
      pageSize: 5,
      length: 16384 };
    // const data = [{value: '12', id: 1}, {value: '1a', id: 1}];
    const service = fixture.debugElement.injector.get(AppService);
    localStorage.setItem('validPhone', '123');
    component.onPageChange(pageEvent);
    service.submit('123', '10', '0');
    tick();
    console.log(component.combinations);
    // service.combinations.next(data);
    service.getCombUpdateListener().subscribe( val => {
      // expect(val).toEqual(data);
      console.log('DONE!!!!!!!');
    });
}));


});
