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
  @Input('work_completed') work_completed: String;
  work:String='';

  constructor(private _user:UserService, private _router:Router) {
    // this.work = _user.work_completed;
    this._user.user().subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit() {

  }

  addName(data){ 
    //console.log(data);   
    this.username = data.username;
  }

  logout(){
    this._user.logout().subscribe(
      data=>{
        localStorage.clear();
        this._router.navigate(['/login'])
      },
      error=>console.error(error)
    )
  }

  update_redirect(){
    this._router.navigate(['/editprofile']); 
  }

}