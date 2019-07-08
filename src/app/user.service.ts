import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isloggedin:any=false;
  
  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){

    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user(){
    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  title_of_toDo(body:any){
    return this._http.post('http://127.0.0.1:3000/users/save_todo_title',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getToDoList(body:any):Observable<any>{  
    try {
     
     let params1 = new HttpParams().set('userid',body);
     return this._http.get('http://127.0.0.1:3000/users/retriveToDolist/',{params:params1})
    }catch(e) {
      console.log(e);
    }
  }

  TOdodelete(id){
    alert(id);
    return this._http.delete('http://127.0.0.1:3000/users/deleteToDo',id);
  }


  viewIndividualHead(body:any):Observable<any>{
    try { 
      let params1 = new HttpParams().set('title_head_id',body);
      return this._http.get('http://127.0.0.1:3000/users/viewHeadIndividual/',{params:params1})
     }catch(e) {
       console.log(e);
     }
  }


  insertSubtitle(body:any){
    return this._http.post('http://127.0.0.1:3000/users/addSubTitle',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }


  listSubtitles(body:any):Observable<any>{
    try { 
      // console.log('listSubtitles service');
      // console.log(body);
      let header_title_id = new HttpParams().set('title_head_id',body);
      return this._http.get('http://127.0.0.1:3000/users/listSubtitles/',{params:header_title_id})
     }catch(e) {
       console.log(e);
     }
  }

  taskDoneSubtitle(id){
    return this._http.put(`http://127.0.0.1:3000/users/subtitleChecked`, {id},{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }

  subtitles_deletd(body:any):Observable<any>{
    try { 
      // console.log('listSubtitles service');
       console.log(body);
      let header_title_id = new HttpParams().set('title_head_id',body);
      return this._http.get('http://127.0.0.1:3000/users/deletdSubtitles/',{params:header_title_id})
     }catch(e) {
       console.log(e);
     }
  }

  profileUpdate(body:any){
   // console.log(body);
    return this._http.post('http://127.0.0.1:3000/users/updateProfile',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  uncheckSubtitle(id){
    return this._http.put(`http://127.0.0.1:3000/users/uncheckedSubtitle`, {id},{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }

}