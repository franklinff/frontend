import { Component, OnInit, Input, Output ,EventEmitter,OnChanges } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-status-todo',
  templateUrl: './status-todo.component.html',
  styleUrls: ['./status-todo.component.css']
})
export class StatusTodoComponent implements OnInit {

  status:String='';
  task_done:any='';

  @Input() childMessage: string;
  @Input() private uploadSuccessDone: EventEmitter<any>;


  constructor(private _user:UserService) { }

  ngOnInit() {
   
    this.uploadSuccessDone.subscribe(()=>{
        this.getSubtitles(this.childMessage);
    }) 
    this.getSubtitles(this.childMessage);
  }

  getSubtitles(childMessage){
      this._user.listSubtitles(JSON.stringify({head_id:this.childMessage,token: localStorage.getItem('access_token')})).subscribe( data=> {

        if(data.listofsubtitles.length > 0){
        this.task_done = ((data.headertodo.length/data.listofsubtitles.length)*100).toFixed(2);
        }
        if(data.listofsubtitles.length == 0 && data.headertodo.length == 0 ){
          this.task_done = '';
        }
  
      }
    )
  }

}
