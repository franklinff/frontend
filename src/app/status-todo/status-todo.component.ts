import { Component, OnInit, Input  } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-status-todo',
  templateUrl: './status-todo.component.html',
  styleUrls: ['./status-todo.component.css']
})
export class StatusTodoComponent implements OnInit {

  @Input() childMessage: string;

  status:String='';

  constructor(private _user:UserService) { }

  ngOnInit() {
    this.getSubtitles(this.childMessage);
  }

  getSubtitles(childMessage){ 
    this._user.listSubtitles(this.childMessage).subscribe( data=> {   
      if(data.headertodo.length ==  data.listofsubtitles.length  &&data.listofsubtitles.length > 0){
        this.status = 'Completed';
       }
      }
    )
  }


}
