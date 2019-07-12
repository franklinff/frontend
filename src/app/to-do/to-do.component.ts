import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from "bootstrap";
import * as $AB from 'jquery';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
 
  title_list:String='';
  user_id:String='';
  head_title:String='';
  todoheadID:String='';
  heroes:[];
  headertodo:String='';
  headertodo_id:String='';
  addTaskValue: string = '';
  subtitle='';
  listofsubtitles:[];
  deleted_subtitles:[];
  subtitle_edit:String='';
  subtitle_id:String='';
  //todo_id='';
  head_todo_id='';
  infoMessage = '';

  constructor(private _user:UserService,private _router:Router,private fb: FormBuilder,private route: ActivatedRoute) { }

  loggedinuser(data){
    this.user_id = data._id
  }

  profileForm = this.fb.group({
    title_list: ['', Validators.required],
    user_id:['']
  });

  editTodoTitleForm = this.fb.group({
    title_list: ['', Validators.required],
    _id:['']
  });

  subtitleForm = this.fb.group({
    subtitle: ['', Validators.required],
    headertodo_id:['',Validators.required],
  //  todo_id:['',Validators.required]
  });


  editSubtitleForm = this.fb.group({
    subtitle_edit: ['', Validators.required],
    subtitle_id:[''],
    head_todo_id:['']
  });


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if(params.profile_updated !== undefined && params.profile_updated === 'true') {
          this.infoMessage = 'User profile updated!';
      }
    });
    setTimeout(function() {
      this.infoMessage = false;
      console.log(this.infoMessage);
    }.bind(this), 4200);


    const subscription = this._user.user().subscribe(data => {
      this.loggedinuser(data);
      this.retriveToDoList();
      subscription.unsubscribe();
    },
      error =>this._router.navigate(['/login'])
    );

   }

  onSubmit(){
    console.warn(this.profileForm.value);
    if(!this.profileForm.valid){
      console.log('Invalid form'); return; 
    }
     
    this._user.title_of_toDo(JSON.stringify(this.profileForm.value)).subscribe(
     data=> {  
        this.title_list = ''; 
        this.retriveToDoList();  
        error=> console.error(error); 
      }
    ) 
  }

  retriveToDoList(){   
    this.deleted_subtitles = [];
    this._user.getToDoList(this.user_id).subscribe(data => {
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
  //  console.log('I am viewHead');
    this._user.viewIndividualHead(id).subscribe( data=> {
          this.getSubtitles(id);  
          this.invidualTododetails(data);
          this.deletd_subtitles(id);
          error=> console.error(error); 
        }
      ) 
  }

  invidualTododetails(data){
   // console.log('invidualTododetails');
    this.headertodo = data[0].listTitle;
    this.headertodo_id = data[0]._id;
  }

  addSubtitle(){
    console.log(JSON.stringify(this.subtitleForm.value.headertodo_id));
    console.warn(this.subtitleForm.value);
    if(!this.subtitleForm.valid){
      console.log('Invalid form');
      this.subtitle = null;
      return; 
    }else{
      this.subtitle = null; 
      this._user.insertSubtitle(JSON.stringify(this.subtitleForm.value)).subscribe(   
        data=> { 
             this.getSubtitles(this.subtitleForm.value.headertodo_id); 
             this.deletd_subtitles(this.subtitleForm.value.headertodo_id); 
            // console.log('addSubtitle() in component ');  
            error=> console.error(error); 
          }
        ) 
    }
  }

  getSubtitles(id){ //console.log(id); 
    this._user.listSubtitles(id).subscribe( data=> {    
        this.listSubtitles(data);        
        error=> console.error(error); 
      }
    )
  }

  listSubtitles(data){
    // console.log('listSUbtitles'); 
    // console.log(data);
    this.listofsubtitles = data; 
  }

  deletd_subtitles(user_id){
    console.log('Ia m in deletd_subtitles');
    this._user.subtitles_deletd(user_id).subscribe( data=> { 
      
      console.log('DeletdSubtitles'); 
      console.log(data);

      this.listDeletdSubtitles(data);      
      error=> console.error(error); 
    }
    )
  }

  listDeletdSubtitles(data){
    console.log(data);
    this.deleted_subtitles = data; 
  }

  subtitleTaskDone(subtitle_id,to_do_headtitleid){
    this._user.taskDoneSubtitle(subtitle_id).subscribe( data=> {  
     // console.log('I am in subtitleTaskDone'); 
     // console.log(data); 
      this.getSubtitles(to_do_headtitleid);
      this.deletd_subtitles(to_do_headtitleid);
      error=> console.error(error); 
    }
  )
  }

  undosubtitleTaskDone(subtitle_id,to_do_headtitleid){
    //  console.log(subtitle_id); 
    //  console.log(to_do_headtitleid);
     this._user.uncheckSubtitle(subtitle_id).subscribe( data=>{
      console.log(data); 
      this.getSubtitles(to_do_headtitleid);
      this.deletd_subtitles(to_do_headtitleid);
     })
  }

  showModal(data){
    $("#editListHead").modal('show');
    this.headertodo = data.listTitle;
    console.log(data);

    this.editTodoTitleForm = this.fb.group({
      title_list: [data.listTitle, Validators.required],
      _id:[data._id]
      }); 
  }


  submitEditHead(){
    console.log(this.editTodoTitleForm.value);
    this._user.editTitle(JSON.stringify(this.editTodoTitleForm.value)).subscribe( data=>{
    console.log(data);
    this.retriveToDoList();
    this.viewHead(this.editTodoTitleForm.value._id);
     })    
  }

  deleteHead(){
    console.log(this.editTodoTitleForm.value);
    this._user.deleteTitle(JSON.stringify(this.editTodoTitleForm.value)).subscribe( data=>{
      this.retriveToDoList();
      this.headertodo = '';
    })
  }

  openModalforAdd(){
    $("#myModal").modal('show');
    $(".title_list").val('');
  }



  subtitle_permanent_delete(data){
    this._user.subtitlePermanentDelete(JSON.stringify(data)).subscribe( result=>{
       this.viewHead(data.to_do_headtitleid);
     });
  }

  openModalforEditSubtitle(data){
    console.log(data);
    $("#editSubtitle").modal('show');
    this.subtitle_edit = data.sub_title;
    this.subtitle_id =data._id;
    this.head_todo_id =data.to_do_headtitleid;
    console.log(data);
  }


  editSubtitleFormSubmit(){
    console.log(this.editSubtitleForm.value);
    this._user.editSubtitle(JSON.stringify(this.editSubtitleForm.value)).subscribe( result=>{
      console.log(result);
      this.getSubtitles(this.editSubtitleForm.value.head_todo_id);
    });
  }

}



