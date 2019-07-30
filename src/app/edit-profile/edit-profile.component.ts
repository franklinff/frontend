import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  username= '';
  email='';
  existingpassword='';
  newPassword='';
  user_id='';
  submitted = false;
  wrong_pwd = false;
  duplicate_email = false;


  updateprofileForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.email,Validators.required]),
      username:new FormControl(null,Validators.required),
      newPassword:new FormControl(null) ,
      user_id:new FormControl(localStorage.getItem('access_token'))
   
  })

  get f() { return this.updateprofileForm.controls; }

  constructor(private _router:Router,private _user:UserService) { 
    this._user.logged_in_user(localStorage.getItem('access_token')).subscribe(
      data=>this.displayProfile(data)
    )
  }

  ngOnInit() {}

  displayProfile(data){ 
     this.username = data.username;
     this.email = data.email;
     this.user_id= localStorage.getItem('access_token');
  }

  redirect_ontodos(){
    this._router.navigate(['/lists']);
  }

  updated_profile_data(){
    //console.log(this.updateprofileForm.value);
    this.submitted = true;
    if(!this.updateprofileForm.valid){   
      console.log('Invalid form'); return; 
    }

    this._user.profileUpdate(JSON.stringify(this.updateprofileForm.value)).subscribe(
        (data:any)=> {
          console.log(data);
          if(data.result){
            this._user.username = this.updateprofileForm.value.username;  
            this._router.navigate(['/lists'],{queryParams: { profile_updated: 'true'}});
          }else{
            this.duplicate_email = true;
          }

        }
    )
  }
  


}
