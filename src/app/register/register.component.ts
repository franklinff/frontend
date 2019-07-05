import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.email,Validators.required]),
      username:new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      cpass:new FormControl(null,Validators.required)
  });

  constructor(private _router:Router,private _userService:UserService) { }

  ngOnInit() {
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
        console.log('Invalid form'); return; 
    }

    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
        data=> { console.log(data);this._router.navigate(['/login'])
        error=> console.error(error) ; }
    )

    console.log(JSON.stringify(this.registerForm.value));
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

}
