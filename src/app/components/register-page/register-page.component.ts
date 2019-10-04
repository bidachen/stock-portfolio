import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  addUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit(){
    this.registerService.createUser(this.addUserForm)
    .then(
      res => {
        this.registerService.saveUser(this.addUserForm);
        this.router.navigate(['/login']);
      }
    )
    .catch(e => {alert(e.message);});
  }

  buildForm(){
    this.addUserForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ["", Validators.compose([Validators.required, Validators.pattern('.+[@].+[.].+')])],
    })
  }

}
