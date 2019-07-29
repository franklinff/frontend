import { Component, OnInit,Output,EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  head_todo_id='';
  infoMessage = '';
  work_completed:any='';
  @Output() uploadSuccess = new EventEmitter();


  constructor(private _user:UserService,private _router:Router,private fb: FormBuilder,private route: ActivatedRoute,private modalService: NgbModal) {  }

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
            this._router.navigate(['/lists']);
        }
      });
      setTimeout(function() {
        this.infoMessage = false;
      }.bind(this),2500);
      this.retriveToDoList();
   }


  onSubmit(){ 
    //   console.log(this.profileForm.value);  
    if(!this.profileForm.valid){
      console.log('Invalid form'); return; 
    }
  this._user.title_of_toDo(JSON.stringify(this.profileForm.value)).subscribe(
     (data:any)=> {  
        this._user.work_completed = data.total_completed_work;
        this.heroes = data.headertodo    
        this.title_list = '';  
        error=> console.error(error); 
      }
    ) 
  }

  retriveToDoList(){   
    this.deleted_subtitles = [];
    this._user.getToDoList(localStorage.getItem('access_token')).subscribe((data:any)=> { 
       this.heroes = data.listData;
       this._user.work_completed = data.work_done; 
    });
  }

  deleteTOdo(id){
    this._user.TOdodelete(id).subscribe(
       data=> { 
          error=> console.error(error); 
        }
      ) 
  }

  viewHead(id){ 
      this._user.viewIndividualHead(JSON.stringify({subtitle_id: id, user_id: localStorage.getItem('access_token')})).subscribe((data:any)=> {             
          this.headertodo = data.headertodo[0].listTitle;
          this.headertodo_id = data.headertodo[0]._id;
          this.listofsubtitles = data.listofsubtitles;
          error=> console.error(error); 
          }
        )      
    }

  addSubtitle(){
    // console.log(this.subtitleForm.value.headertodo_id);
    if(!this.subtitleForm.valid){
      console.log('Invalid form');
      this.subtitle = null;
      return; 
    }else{
      this.subtitle = null; 
      this._user.insertSubtitle(JSON.stringify(this.subtitleForm.value)).subscribe(   
        (data:any)=> {
            this._user.work_completed = data.total_completed_work; 
            this.listofsubtitles = data.listofsubtitles
            this.uploadSuccess.emit();
            error=> console.error(error);   
          }
        )   
    }
  }

  subtitleTaskDone(subtitle_id,to_do_headtitleid){ 
    this._user.taskDoneSubtitle(JSON.stringify({subtitle_id: subtitle_id,to_do_headtitleid: to_do_headtitleid, user_id: localStorage.getItem('access_token')})).subscribe( (data:any)=> {       
      this._user.work_completed = data.total_completed_work; 
      this.listofsubtitles = data.listofsubtitles;
      this.uploadSuccess.emit();
      error=>{ console.error(error); } 
     }
    )
 
  }

  undosubtitleTaskDone(subtitle_id,to_do_headtitleid){
      this._user.uncheckSubtitle(JSON.stringify({subtitle_id: subtitle_id,to_do_headtitleid: to_do_headtitleid,user_id: localStorage.getItem('access_token')})).subscribe((data:any)=>{    
      this._user.work_completed = data.total_completed_work;  
      this.listofsubtitles = data.listofsubtitles;
      this.uploadSuccess.emit();
     })   
  }

  showModal(data){  

    this.editTodoTitleForm = this.fb.group({
      title_list: [data.listTitle, Validators.required],
      _id:[data._id],
      user_id:localStorage.getItem('access_token')
    }); 

    this._user.viewIndividualHead(JSON.stringify({subtitle_id: data._id, user_id: localStorage.getItem('access_token')})).subscribe((data:any)=> {             
      this.headertodo = data.headertodo[0].listTitle;
      this.headertodo_id = data.headertodo[0]._id;
      this.listofsubtitles = data.listofsubtitles;
      error=> console.error(error); 
      }
    )
  }

  submitEditHead(){ 
    this._user.editTitle(JSON.stringify(this.editTodoTitleForm.value)).subscribe( (data:any)=>{
      this.headertodo = data.headertodo[0].listTitle;
      this.headertodo_id = data.headertodo[0]._id;
      this.listofsubtitles = data.listofsubtitles;
      this.heroes = data.listData;
    })    
  }

  deleteHead(){ 
   //console.log(this.editTodoTitleForm.value);
    this._user.deleteTitle(JSON.stringify(this.editTodoTitleForm.value)).subscribe( (data:any)=>{
      this.heroes = data.list_of_title_head;
      this._user.work_completed = data.total_completed_work;
      this.headertodo = '';
      this.headertodo_id = '';
      this.listofsubtitles = [];
    })
  }

  subtitle_permanent_delete(data){ 
    this._user.subtitlePermanentDelete(JSON.stringify({subtitle_id: data._id, user_id: localStorage.getItem('access_token'),head_todo_id: data.to_do_headtitleid })).subscribe( (result:any)=>{
        this._user.work_completed = result.total_completed_work;      
        this.headertodo = result.headertodo[0].listTitle;
        this.headertodo_id = data.to_do_headtitleid;
        this.listofsubtitles = result.listofsubtitles;
        this.uploadSuccess.emit(); 
     });   
  }

  openModalforEditSubtitle(data){
    this.subtitle_edit = data.sub_title;
    this.subtitle_id =data._id;
    this.head_todo_id =data.to_do_headtitleid;
  }

  editSubtitleFormSubmit(){
    this._user.editSubtitle(JSON.stringify(this.editSubtitleForm.value)).subscribe( (result:any)=>{
       this.headertodo = result.headertodo[0].listTitle;
       this.headertodo_id = result.headertodo[0]._id;
       this.listofsubtitles = result.listofsubtitles;
    });
  }

}



