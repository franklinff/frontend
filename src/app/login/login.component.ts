import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  error={message:null};
  infoMessage = '';
 
  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required)
  });

  get f() { return this.loginForm.controls; }

  constructor(private _router:Router,private _user:UserService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        if(params.registered !== undefined && params.registered === 'true') {
            this.infoMessage = 'Registration Successful! Please Login!';
        }
      });

      setTimeout(function() {
        this.infoMessage = false;
      }.bind(this), 2400);
   }

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
    const subscription = this._user.login(JSON.stringify(this.loginForm.value)).subscribe(
        (data:any) =>{ 
         // console.log(data);
          localStorage.setItem('access_token',data.jwttoken);
          this._user.isloggedin=data;
          this._router.navigate(['/lists']);
          subscription.unsubscribe();
        },
        (error)=>{
              if(error.error.message == 'Incorrect username.'){
                  this.error.message = 'Incorrect Email.' 
              }else{
                this.error.message = error.error.message;
              }
        } 
    )
  }

}
