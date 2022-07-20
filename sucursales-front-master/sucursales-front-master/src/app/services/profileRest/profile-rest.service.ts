import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CompanyRestService } from "../companyRest/company-rest.service";


@Injectable({
  providedIn: 'root'
})
export class ProfileRestService {
  httpOptions = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.companyRest.getToken()})
  constructor(
    private http: HttpClient,
    private companyRest: CompanyRestService
  ) { }

}
