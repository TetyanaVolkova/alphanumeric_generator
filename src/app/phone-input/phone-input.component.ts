import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css']
})
export class PhoneInputComponent implements OnInit {
  validPhone = '';
  phoneForm = new FormGroup({
    phone: new FormControl()
  });
  constructor(private appService: AppService,
              public router: Router) {}

  ngOnInit() {}

  submit() {
    this.validPhone = this.phoneForm.value.phone;
    localStorage.setItem('validPhone', this.validPhone);
    this.router.navigate(['/combinations']);
    this.phoneForm.reset();
  }

}
