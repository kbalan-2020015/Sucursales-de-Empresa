import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json', 'Authorization': this.getToken()
});

  constructor(
    private http: HttpClient
  ) { }

  test(message: string){
    console.log(message);
  }

  register(params:{}){
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'company/register', body, {headers: this.httpOptions});
  }

  login(params: {}){
    let body = JSON.stringify(params); 
    return this.http.post(environment.baseUrl + 'company/login', body, {headers: this.httpOptions});
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = '';
    }
    return token;
  }

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity =  JSON.parse(globalIdentity);
    }else{
      identity = '';
    }
    return identity;
  }


updateCompany(id:string,params:{}){
    return this.http.put(environment.baseUrl + 'company/update/' + id,params,{headers:this.httpOptions});
}

deleteCompany(id:string){
  return this.http.delete(environment.baseUrl + 'company/delete/' + id,{headers: this.httpOptions});
}

}
