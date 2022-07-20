import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CompanyRestService } from "../companyRest/company-rest.service";

@Injectable({
    providedIn: 'root'
})
export class ProductRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.companyRest.getToken()
    });

    constructor(
        private http: HttpClient,
        private companyRest: CompanyRestService
    ){}

    getProducts(){
        return this.http.get(environment.baseUrl + 'products/getProducts', {headers: this.httpOptions});
    }

    getProduct(id:string){
        return this.http.get(environment.baseUrl + 'products/getProduct/' + id,{headers: this.httpOptions});
    }

    newProduct(params:{}){
        return this.http.post(environment.baseUrl + 'products/newProduct', params,{headers: this.httpOptions});
    }

    updateProduct(id:string,params:{}){
        return this.http.put(environment.baseUrl + 'products/update/' + id,params,{headers:this.httpOptions});
    }

    deleteProduct(id:string){
        return this.http.delete(environment.baseUrl + 'products/delete/' + id,{headers: this.httpOptions});
    }

    getProductsByDes(){
        return this.http.get(environment.baseUrl + 'products/getProductsByDes', {headers: this.httpOptions});
    }

    getProductsByAsc(){
        return this.http.get(environment.baseUrl + 'products/getProductsByAsc', {headers: this.httpOptions});
    }

    getProductsByName(params:{}){
        return this.http.post(environment.baseUrl + 'products/getProductByName' , params,{headers: this.httpOptions});
    }

    getProductByProvider(params:{}){
        return this.http.post(environment.baseUrl + 'products/getProductByProvider',params,{headers: this.httpOptions})
    }

}