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
  headertodo:String='';
  headertodo_id:String='';
  addTaskValue: string = '';
  subtitle='';
  listofsubtitles:[];

  constructor(private _user:UserService,private _router:Router,private fb: FormBuilder) { }

  loggedinuser(data){
    this.user_id = data._id
  }

  profileForm = this.fb.group({
    title_list: ['', Validators.required],
    user_id:['']
  });


  subtitleForm = this.fb.group({
    subtitle: ['', Validators.required],
    headertodo_id:['', Validators.required]
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
    this.subtitle = null; 
    this._user.title_of_toDo(JSON.stringify(this.profileForm.value)).subscribe(
    data=> {  
        this.retriveToDoList();  
        error=> console.error(error); 
      }
    ) 
  }

  retriveToDoList(){   
   // console.log("Id: ", this.user_id);
    this._user.getToDoList(this.user_id).subscribe(data => {
     // console.log(data);   
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

  viewHead(id){
    console.log('I am viewHead');
    this._user.viewIndividualHead(id).subscribe( data=> {  
          this.invidualTododetails(data);
          this.getSubtitles(id);
          error=> console.error(error); 
        }
      ) 
  }

  invidualTododetails(data){
    console.log(data);
    this.headertodo = data[0].listTitle;
    this.headertodo_id = data[0]._id;
  }

  addSubtitle(){
    //  console.log('i am addSubtitle');
    //  console.warn(this.subtitleForm.value.headertodo_id);

    if(!this.subtitleForm.valid){
      console.log('Invalid form');this.subtitle = null;  return; 
    }else{
      this.subtitle = null; 
      this._user.insertSubtitle(JSON.stringify(this.subtitleForm.value)).subscribe(   
        data=> { 
            this.getSubtitles(this.subtitleForm.value.headertodo_id);       
            console.log(data);  
            error=> console.error(error); 
          }
        )
      
    }
  }

  getSubtitles(id){
    this._user.listSubtitles(id).subscribe( data=> {  
      //console.log(data); 
      this.listSubtitles(data);        
      error=> console.error(error); 
    }
  )
  }

  listSubtitles(data){
    //console.log('listSUbtitles'); 
   // console.log(data);
    this.listofsubtitles = data; 
  }

  subtitleTaskDone(subtitle_id){

    this._user.taskDoneSubtitle(subtitle_id).subscribe( data=> {  
      console.log(data); 
      this.listSubtitles(data);        
      error=> console.error(error); 
    }
  )
  }

}
