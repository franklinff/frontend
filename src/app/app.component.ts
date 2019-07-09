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

  constructor (private user:UserService,private _router:Router){ }



 ngOnInit() {
    const subscription = this.user.user()
    .subscribe(data => {
      this.user.isloggedin=data;
      subscription.unsubscribe();
    },
      error =>this._router.navigate(['/login'])
    );
 }



}
