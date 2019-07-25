import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend';
  isloggedin:any=false;
  username:String='';

  constructor (private user:UserService,private _router:Router){
      const subscription = this.user.logged_in_user(localStorage.getItem('access_token')).subscribe(data => {       
          this.user.isloggedin=data;   
          subscription.unsubscribe();
      },
      error =>this._router.navigate(['/login'])
    );
  }

  ngOnInit() { }

  logout(){    
    localStorage.clear();
    sessionStorage.clear(); 
    this.user.logout().subscribe(data=>{
          this.user.isloggedin=false; 
          this._router.navigate(['/login'])      
        },   
        error=>console.error(error)
    ) 
  }

}
