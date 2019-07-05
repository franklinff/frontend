import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms'


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  user_id:String='';
  head_title:String='';
  todoheadID:String='';
  heroes:[];
 

  constructor(private _user:UserService,private _router:Router,private fb: FormBuilder) { 
    
  }

  loggedinuser(data){
    this.user_id = data._id
  }

  profileForm = this.fb.group({
    title_list: ['', Validators.required],
    user_id:['']
  });

  ngOnInit() {
    const subscription = this._user.user()
    .subscribe(data => {
      this.loggedinuser(data);
      this.retriveToDoList();
      subscription.unsubscribe();
    },
      error =>this._router.navigate(['/login'])
    );
    console.log('hello');
   }

  onSubmit(){
    console.warn(this.profileForm.value);
    if(!this.profileForm.valid){
      console.log('Invalid form'); return; 
    }
    this._user.title_of_toDo(JSON.stringify(this.profileForm.value)).subscribe(
    
    data=> {  
        console.log(data);
        error=> console.error(error); 
      }
    ) 
  }


  retriveToDoList(){   
    console.log("Id: ", this.user_id);

    this._user.getToDoList(this.user_id).subscribe(data => {
      console.log(data);   
      this.listToDoFrontend(data);
    });
  }

  listToDoFrontend(data){
    this.heroes = data;
  }


  deleteTOdo(id){


    this._user.TOdodelete(id).subscribe(
    
      data=> {  
          console.log(data);
          error=> console.error(error); 
        }
      ) 
  }


}
