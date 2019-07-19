import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AbstractControl } from '@angular/forms';
import { MustMatch } from '../must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  form: FormGroup;
  submitted = false;
  email_unique:String='';

  registerForm:FormGroup = this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      username:new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      cpass:new FormControl('',Validators.required)   
    }, {
      validator: MustMatch('password', 'cpass')
  })

  get f() { return this.registerForm.controls; }
  
  constructor(private _router:Router,private _userService:UserService,private formBuilder: FormBuilder) {   }
  
  ngOnInit() {}

  register(){
    this.submitted = true;
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){   
      console.log('Invalid form'); return; 
    }
    this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(
        data=> {
                 
          if(typeof data === 'object'){
            console.log(data);
            this._router.navigate(['/login'],{queryParams: { registered: 'true'}});
          }
          if(typeof data === 'string'){
            console.log(data);
            this.email_unique = 'User already registered with the above mail.';
          }       
         // error=> console.error(error) ; 
        }
    )
    console.log(JSON.stringify(this.registerForm.value));
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

}
