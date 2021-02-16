import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { User } from 'src/model';
import * as emailjs from 'emailjs-com';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('closebutton') closebutton;
  datas: any;
  AddForm: FormGroup;
  searchText = '';
  length: any;
  Fullname: any;
  Email: any;
  Phone: any;
  Company: any;
  Address: any;
  Designation: any;
  MessageForm: FormGroup;
  sendEmail: any;
  // data: Object;
  constructor(private formBuilder: FormBuilder,
    public userService: UserService
  ) { }
  ngOnInit(): void {
    this.MessageForm = this.formBuilder.group({
      Fname: ['', [Validators.required]],
      Tname: ['', [Validators.required]],
      msg: ['', [Validators.required]]
    });
    this.AddForm = this.formBuilder.group({
      Fullname: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      Phone: ['', [Validators.required]],
      Company: ['', [Validators.required]],
      Address: [''],
      Designation: ['', [Validators.required]]
    });
    this.userService.getAll().pipe(first()).subscribe(data => {
      this.datas = data;
      console.log(this.datas);
      this.length = this.datas.length;
    });
  }
  get f() { return this.AddForm.controls; }
  get fb() { return this.MessageForm.controls; }

  onSubmit() {
    this.userService.addContacts(this.AddForm.value).subscribe(data => {
      console.log(data);
      // this.data=data;
      // this.alert('added successfully');
      this.datas.unshift(data);
      console.log(data);
      this.userService.getAll();
      this.AddForm.patchValue({
        Fullname: '',
        Email: '',
        Phone: '',
        Company: '',
        Address: '',
        Designation: ''
      });
      this.closebutton.nativeElement.click();
    }, error => {
      // this.alertService.error(error);
      // this.loading = false;
      console.log(error);
    });
  }
  onSelect(data) {
    console.log(data);
    this.Fullname = data.Fullname;
    this.Email = data.Email;
    this.Phone = data.Phone;
    this.Company = data.Company;
    this.Address = data.Address;
    this.Designation = data.Designation;
  }
  send() {
    emailjs.sendForm(
      "service_zj67zei",
      "template_p9ly71u",
      ".sendmsg",
      "user_068oewEBdtbje4Etx6p3Q"
    ).then().catch()
  }

  onGet(value) {
    this.sendEmail = value.Email;
    console.log('ytfy', this.sendEmail);
  }
  onSwap() {

    var tmp = document.getElementById("Fname").value;
    document.getElementById("Fname").value = document.getElementById("Tname").value;
    document.getElementById("Tname").value = tmp;

  }
}

