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
  phoneForm = new FormGroup({
    phone: new FormControl()
  });
  constructor(private appService: AppService,
              private router: Router) {}

  ngOnInit() {}

  submit() {
    const validPhone = this.phoneForm.value.phone;
    localStorage.setItem('validPhone', validPhone);
    this.router.navigate(['/combinations']);
    this.phoneForm.reset();
  }

}
