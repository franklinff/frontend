import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  error={message:null};

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required)
  });

  get f() { return this.loginForm.controls; }

  constructor(private _router:Router,private _user:UserService) { }

  ngOnInit() { }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){ 
    this.submitted = true;
    if(!this.loginForm.valid){
      console.log('Invalid'); 
      return;
    }
    //console.log(JSON.stringify(this.loginForm.value));
    this._user.login(JSON.stringify(this.loginForm.value)).subscribe(
        data =>{ 
          console.log(data);
          this._user.isloggedin=data;
          this._router.navigate(['/lists']);
        },
        (error)=>{
          this.error.message = error.error.message;
          console.log(error);
        } 
    )
  }

}
