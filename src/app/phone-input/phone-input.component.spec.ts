import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PhoneInputComponent } from './phone-input.component';
import { RouterModule, Router} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../app.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


describe('PhoneInputComponent', () => {
  let component: PhoneInputComponent;
  let fixture: ComponentFixture<PhoneInputComponent>;

  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneInputComponent ],
      imports: [RouterTestingModule,
                RouterModule,
                BrowserAnimationsModule,
                HttpClientModule,
                HttpClientTestingModule,
                FormsModule,
                MatInputModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatButtonModule,
                MatCardModule],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects Rxjs observable to return correct data', fakeAsync(()  => {
    const data = [{value: '12', id: 1}, {value: '1a', id: 2}];
    const service = fixture.debugElement.injector.get(AppService);
    component.submit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/combinations']);
    service.combinations.next(data);
    service.getCombUpdateListener().subscribe( val => {
      expect(val).toEqual(data);
    });
}));

});
