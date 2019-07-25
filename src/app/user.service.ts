import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams,HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  isloggedin:any=false;
  jwttoken = '';
  work_completed:any='';
  username:any='';
  base_url:any = 'http://127.0.0.1:3000/users/';
   
  constructor(private _http:HttpClient) {   }

  register(body:any){
    return this._http.post(this.base_url+'register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this._http.post(this.base_url+'login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  logged_in_user(body:any){
    try {  
      let user = new HttpHeaders().append('token',body);
      return this._http.get(this.base_url+'getuser_info/',{headers:user})   
    }catch(e) {
      console.log(e);
    }
  }

  // user(){
  //   return this._http.get(this.base_url+'user',{
  //     observe:'body',
  //     withCredentials:true,
  //     headers:new HttpHeaders().append('Content-Type','application/json')
  //   })
  // }

  logout(){
    return this._http.get(this.base_url+'logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  title_of_toDo(body:any){
    return this._http.post(this.base_url+'save_todo_title',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  //getToDoList(body:any):Observable<any>{  
  getToDoList(body:any){  
    try {  
      let user = new HttpHeaders().append('userid',body);
      return this._http.get(this.base_url+'retriveToDolist/',{headers:user})   
    }catch(e) {
      console.log(e);
    }
  }

  TOdodelete(id){
    alert(id);
    return this._http.delete(this.base_url+'deleteToDo',id);
  }

  viewIndividualHead(body:any){
    try {  
      let user = new HttpHeaders().append('title_head_id',body);
      return this._http.get(this.base_url+'viewIndividual/',{headers:user})   
    }catch(e) {
       console.log(e);
     }
  }

  insertSubtitle(body:any){ 
    return this._http.post(this.base_url+'addSubTitle',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  listSubtitles(body:any):Observable<any>{
    try { 
      let user = new HttpHeaders().append('userid',body);
      return this._http.get(this.base_url+'listSubtitles/',{headers:user})
     }catch(e) {
       console.log(e);
     }
  }

  subtitles_deletd(body:any):Observable<any>{
    try { 
      let header_title_id = new HttpParams().set('title_head_id',body);
      return this._http.get(this.base_url+'deletdSubtitles/',{params:header_title_id})
     }catch(e) {
       console.log(e);
     }
  }

  taskDoneSubtitle(body:any){
      return this._http.post(this.base_url+'subtitleChecked', body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }

  profileUpdate(body:any){
   // console.log(body);
    return this._http.post(this.base_url+'updateProfile',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  uncheckSubtitle(body:any){
    // console.log(body);    
      return this._http.post(this.base_url+'uncheckedSubtitle', body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }

  editTitle(body:any){
    return this._http.post(this.base_url+'updateTitle',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteTitle(body:any){ 
    return this._http.post(this.base_url+'deleteTitletodo',body,{
      //observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  subtitlePermanentDelete(body:any) {
    return this._http.post(this.base_url+'PermanentDeleteSubtitle',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  editSubtitle(body:any){
  //  console.log(body);
    return this._http.post(this.base_url+'subtitleUpdate',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

}