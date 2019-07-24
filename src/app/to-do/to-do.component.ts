import { Component, OnInit,Output,EventEmitter, Input} from '@angular/core';
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
  heroes:{};
  headertodo:any='';
  headertodo_id:any='';
  addTaskValue: string = '';
  subtitle='';
  listofsubtitles:[];
  deleted_subtitles:[];
  subtitle_edit:String='';
  subtitle_id:String='';
  //todo_id='';
  head_todo_id='';
  infoMessage = '';
  work_completed:any='';
  @Output() uploadSuccess = new EventEmitter();
  // @Output() uploadSuccess : EventEmitter<number> = new EventEmitter<number>();



  constructor(private _user:UserService,private _router:Router,private fb: FormBuilder,private route: ActivatedRoute) {
  //  this.uploadSuccess.emit(Math.random());
   }

  profileForm = this.fb.group({
    title_list: ['', Validators.required],
    user_id:localStorage.getItem('access_token')
  });

  editTodoTitleForm = this.fb.group({
    title_list: ['', Validators.required],
    _id:[''],
    user_id:localStorage.getItem('access_token')
  });

  subtitleForm = this.fb.group({
    subtitle: ['', Validators.required],
    headertodo_id:['',Validators.required],
    user_id: localStorage.getItem('access_token')
  //  todo_id:['',Validators.required]
  });

  editSubtitleForm = this.fb.group({
    subtitle_edit: ['', Validators.required],
    subtitle_id:[''],
    head_todo_id:['']
  });

  ngOnInit() {

    this.uploadSuccess.emit(Math.random());
    this.route.queryParams.subscribe(params => {
      if(params.profile_updated !== undefined && params.profile_updated === 'true') {
          this.infoMessage = 'User profile updated!';
      }
    });
    setTimeout(function() {
      this.infoMessage = false;
    }.bind(this), 4200);
    this.retriveToDoList();
    // const subscription = this._user.user().subscribe(data => {
    //   this.loggedinuser(data);    
    //   subscription.unsubscribe();
    // },
    //   error =>this._router.navigate(['/login'])
    // );
   }

  loggedinuser(data){
    this.user_id = data._id
  }

  onSubmit(){
  //  console.warn(this.profileForm.value);
    if(!this.profileForm.valid){
      console.log('Invalid form'); return; 
    }
  //  console.log(this.profileForm.value);  
  this._user.title_of_toDo(JSON.stringify(this.profileForm.value)).subscribe(
     data=> {  
        this.work_completed = data; 
        this._user.work_completed = data;   
        
        this.title_list = ''; 
        this.retriveToDoList();  
        error=> console.error(error); 
      }
    ) 
  }

  retriveToDoList(){   
    this.deleted_subtitles = [];
    this._user.getToDoList(localStorage.getItem('access_token')).subscribe((data:any)=> { 
      // console.log(data.work_done);
       this.heroes = data.listData;
       this.work_completed = data.work_done; 
       this._user.work_completed = data.work_done; 
    });
  }

  deleteTOdo(id){
    this._user.TOdodelete(id).subscribe(
       data=> { 
         // console.lo_userg(data);
          error=> console.error(error); 
        }
      ) 
  }

  viewHead(id){  
      this._user.viewIndividualHead(JSON.stringify({subtitle_id: id, user_id: localStorage.getItem('access_token')})).subscribe((data:any)=> {       
       // console.log(data);       
          this.headertodo = data.headertodo[0].listTitle;
          this.headertodo_id = data.headertodo[0]._id;
          this.listofsubtitles = data.listofsubtitles;
          error=> console.error(error); 
          }
        )  
      //  this.getSubtitles(id);
    }



  addSubtitle(){
    // console.log(JSON.stringify(this.subtitleForm.value.headertodo_id));
     console.log(this.subtitleForm.value.headertodo_id);
    if(!this.subtitleForm.valid){
      console.log('Invalid form');
      this.subtitle = null;
      return; 
    }else{
      this.subtitle = null; 
      this._user.insertSubtitle(JSON.stringify(this.subtitleForm.value)).subscribe(   
        data=> {
          this.work_completed = data; 
          this._user.work_completed = data; 
         // this.viewHead(this.subtitleForm.value.headertodo_id);

          this.subtitleTaskDone('',this.subtitleForm.value.headertodo_id);
          //    this.getSubtitles(this.subtitleForm.value.headertodo_id); 
          //    this.deletd_subtitles(this.subtitleForm.value.headertodo_id); 
          //    console.log('addSubtitle() in component ');  
          //    console.log(data);
          //    console.log(this.subtitleForm.value.headertodo_id);
            error=> console.error(error); 
          }
        ) 
    }
  }

  subtitleTaskDone(subtitle_id,to_do_headtitleid){ 
    this._user.taskDoneSubtitle( JSON.stringify({subtitle_id: subtitle_id, user_id: localStorage.getItem('access_token')})).subscribe( data=> {  
      
      
      this.work_completed = data; 
      this._user.work_completed = data; 
      this.viewHead(to_do_headtitleid);
      error=>{console.error(error); } 
     }
  )
  this.uploadSuccess.emit(Math.random());
  
    //      console.log(data);
    // this._user.taskDoneSubtitle(subtitle_id).subscribe( data=> {  
    //  // console.log('I am in subtitleTaskDone'); 
    //  // console.log(data); 
    //   this.getSubtitles(to_do_headtitleid);
    //   this.deletd_subtitles(to_do_headtitleid);
    //   error=> console.error(error); 
    // }  
  }

  undosubtitleTaskDone(subtitle_id,to_do_headtitleid){

     this._user.uncheckSubtitle(JSON.stringify({subtitle_id: subtitle_id, user_id: localStorage.getItem('access_token')})).subscribe( data=>{    
      //console.log(data); 
      this.work_completed = data;
      this._user.work_completed = data;  
      this.viewHead(to_do_headtitleid);
      // this.getSubtitles(to_do_headtitleid);
      //  this.deletd_subtitles(to_do_headtitleid);
      this.uploadSuccess.emit(Math.random());
     })
    
  }

  showModal(data){  
    $("#editListHead").modal('show');
    this.headertodo = data.listTitle;

    this.editTodoTitleForm = this.fb.group({
      title_list: [data.listTitle, Validators.required],
      _id:[data._id],
      user_id:localStorage.getItem('access_token')
      }); 
  }


  submitEditHead(){ 
  //  console.log(this.editTodoTitleForm.value);
    this._user.editTitle(JSON.stringify(this.editTodoTitleForm.value)).subscribe( data=>{
  //  console.log(data);
    this.retriveToDoList();
    this.viewHead(this.editTodoTitleForm.value._id);
     })    
  }

  deleteHead(){ 
   // console.log(this.editTodoTitleForm.value);
    this._user.deleteTitle(JSON.stringify(this.editTodoTitleForm.value)).subscribe( data=>{
      this.work_completed = data;
      this._user.work_completed = data;  
    //  this.getSubtitles(this.editSubtitleForm.value.head_todo_id);
    //  this.viewHead(this.editTodoTitleForm.value._id);
      this.retriveToDoList();
      this.headertodo = '';
      this.headertodo_id = '';
      this.listofsubtitles = [];
    })
  }

  openModalforAdd(){
    $("#myModal").modal('show');
    $(".title_list").val('');
  }


  subtitle_permanent_delete(data){
    this._user.subtitlePermanentDelete(JSON.stringify({subtitle_id: data._id, user_id: localStorage.getItem('access_token')})).subscribe( result=>{
         this.work_completed = result; 
         this._user.work_completed = result;
         this.viewHead(data.to_do_headtitleid);
     });
     this.uploadSuccess.emit(Math.random());   
  }

  openModalforEditSubtitle(data){
  //  console.log(data);
    $("#editSubtitle").modal('show');
    this.subtitle_edit = data.sub_title;
    this.subtitle_id =data._id;
    this.head_todo_id =data.to_do_headtitleid;
  }


  editSubtitleFormSubmit(){
    //console.log(this.editSubtitleForm.value);
    this._user.editSubtitle(JSON.stringify(this.editSubtitleForm.value)).subscribe( result=>{
     //   console.log(result);
     //   this.getSubtitles(this.editSubtitleForm.value.head_todo_id);
      this.viewHead(this.editSubtitleForm.value.head_todo_id);
    });
  }


  // updateTaskStatus(data){
  //   console.log(data);
  // }
  // getSubtitles(childMessage){ 
  //   //this._user.listSubtitles(this.childMessage).subscribe( data=> {

  //     this._user.listSubtitles(JSON.stringify({head_id:childMessage,token: localStorage.getItem('access_token')})).subscribe( data=> {


  //     if(data.listofsubtitles.length > 0){
  //       this.task_done[childMessage] = ((data.headertodo.length/data.listofsubtitles.length)*100).toFixed(2);
  //       //this.status = 'Completed';
  //       //data.headertodo.length ==  data.listofsubtitles.length  &&      
  //       //console.log(childMessage);
  //       //console.log('----------------------');
  //      }
  //     }
  //   )
  // }

    // getSubtitles(id){ //console.log(id); 
  //   this._user.listSubtitles(id).subscribe( data=> {    
  //       //this.listSubtitles(data);
        
  //       this.listofsubtitles = data; 
  //       error=> console.error(error); 
  //     }
  //   )
  // }

  // listSubtitles(data){
  //   // console.log('listSUbtitles'); 
  //   // console.log(data);
  //    this.listofsubtitles = data; 
  // }

  // deletd_subtitles(user_id){
  // //  console.log('Ia m in deletd_subtitles');
  //   this._user.subtitles_deletd(user_id).subscribe( data=> { 
      
  //     // console.log('DeletdSubtitles'); 
  //     // console.log(data);

  //     this.listDeletdSubtitles(data);      
  //     error=> console.error(error); 
  //   }
  //   )
  // }

  // listDeletdSubtitles(data){
  //  // console.log(data);
  //   this.deleted_subtitles = data; 
  // }

    // viewHead(id){  
  // //  console.log('I am viewHead');
  //   this._user.viewIndividualHead(id).subscribe( data=> {
  //         console.log(data);
  //         this.getSubtitles(id);  
  //         this.invidualTododetails(data);
  //         this.deletd_subtitles(id);
  //         error=> console.error(error); 
  //       }
  //     ) 
  // }

  // invidualTododetails(data){
  //  console.log(data);
  //   this.headertodo = data[0].listTitle;
  //   this.headertodo_id = data[0]._id;
  // }


}



