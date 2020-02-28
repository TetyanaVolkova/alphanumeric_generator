import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subscriber } from 'rxjs';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-combinations',
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.css']
})
export class CombinationsComponent implements OnInit, OnDestroy {
  private subscribtion: Subscription;
  public combinations = [];
  public totalCombinations: string;
  public pageIndex = '0';
  public pageSize = '5';
  public limit = '5';
  private validPhone: any;
  public pageSizeOptions = [ 2, 5, 10];

  constructor(private appService: AppService,
              private router: Router) { }

  ngOnInit() {
    this.appService.getCombUpdateListener().subscribe( val => { console.log(val); });
    this.validPhone = localStorage.getItem('validPhone');
    this.appService.submit(this.validPhone, this.limit, this.pageIndex );
    this.subscribtion = this.appService.getCombUpdateListener()
    .subscribe(combinations => {
      this.combinations = combinations[0];
      this.totalCombinations = combinations[1];
    });
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  navigateHome() {
    this.router.navigate(['/']);
  }
  onPageChange(pageData: PageEvent) {
    this.validPhone = localStorage.getItem('validPhone');
    console.log(this.validPhone);
    this.combinations = [];
    this.pageSize = pageData.pageSize.toString();
    this.pageIndex = pageData.pageIndex.toString();
    this.limit = pageData.pageSize.toString();
    this.appService.submit(this.validPhone, this.limit, this.pageIndex);
  }

}
