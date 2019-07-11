import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  username='';
  email='';
  existingpassword='';
  newPassword='';
  user_id='';
  submitted = false;
  wrong_pwd = false;


  updateprofileForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.email,Validators.required]),
      username:new FormControl(null,Validators.required),
      existingpassword: new FormControl(null,Validators.required),
      newPassword:new FormControl(null,Validators.required) ,
      user_id:new FormControl(null,Validators.required) 
  })

  get f() { return this.updateprofileForm.controls; }

  constructor(private _router:Router,private _user:UserService) { 
    this._user.user()
    .subscribe(
      data=>this.displayProfile(data)
    )
  }

  ngOnInit() {}

  displayProfile(data){ 
    this.username = data.username;
    this.email = data.email;
    //this.password=data.password;
    this.user_id= data._id;
  }

  redirect_ontodos(){
    this._router.navigate(['/lists']);
  }

  updated_profile_data(){
    this.submitted = true;
    //console.warn(this.updateprofileForm.value);
    if(!this.updateprofileForm.valid){   
      console.log('Invalid form'); return; 
    }

    this._user.profileUpdate(JSON.stringify(this.updateprofileForm.value))
    .subscribe(
        data=> {
          console.log(data);
          if(data == true){
            console.log('Profile updated');
            this._router.navigate(['/lists']);
          }else{
            this.wrong_pwd = true;
            console.log('Profile not updated');
          }
          }
    )
  }
  


}
