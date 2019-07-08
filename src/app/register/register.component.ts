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

  registerForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.email,Validators.required]),
      username:new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      cpass:new FormControl(null,Validators.required) ,   
    },{
      //validator: passwordConfirming('password', 'cpass') // your validation method
     // validator: this.checkPasswords 
    })




  form: FormGroup;

  submitted = false;
  get f() { return this.registerForm.controls; }

  constructor(private _router:Router,private _userService:UserService,private formBuilder: FormBuilder) {   }

  // registerForm:FormGroup = this.formBuilder.group({
  //   email:['', Validators.required],
  //   username:['', Validators.required],
  //   password:['', [Validators.required, Validators.minLength(6)]],
  //   cpass:['', Validators.required]
  // },{
  //   validator: MustMatch('password', 'cpass') // your validation method
  // })

  
  ngOnInit() {}

  register(){
    this.submitted = true;
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
