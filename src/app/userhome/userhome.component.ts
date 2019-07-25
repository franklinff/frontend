import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  
  username:String='';
  work:String='';
  @Input('work_completed') work_completed: String;

  constructor(private _user:UserService, private _router:Router) {
    // this.work = _user.work_completed;
    this._user.logged_in_user(localStorage.getItem('access_token')).subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit() { }

  addName(data){ 
    //console.log(data);   
    this.username = data.username;
  }

  update_redirect(){
    this._router.navigate(['/editprofile']); 
  }

}