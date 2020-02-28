import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';

import { AppService } from './app.service';

import { HttpClientModule, HttpEvent } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('Service: AppService', () => {

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule,
                    RouterModule.forRoot([])],
          providers: [AppService]
      });
  });

  it('should be created',
  inject(
    [HttpTestingController, AppService],
    (
      appService: AppService
    ) => {
    expect(appService).toBeTruthy();
  }));
});
