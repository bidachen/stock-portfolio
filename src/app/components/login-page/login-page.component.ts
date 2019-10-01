import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AngularFirestore, QueryFn } from "@angular/fire/firestore";
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginUserForm: FormGroup;
  
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

  }
  ngOnInit(){
    this.buildForm();
  }

  private buildForm(){
    this.loginUserForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit(){
    this.authService.login(this.loginUserForm.value.email,this.loginUserForm.value.password);
  }

}
