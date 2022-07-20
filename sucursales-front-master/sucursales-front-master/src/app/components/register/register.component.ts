import { Component, OnInit } from "@angular/core";
import {CompanyModel} from 'src/app/models/company.model'
import { CompanyRestService } from "src/app/services/companyRest/company-rest.service";
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

    company:CompanyModel;
    timer: any;
    constructor(
        private companyRest: CompanyRestService,
        private router: Router
    ){
        this.company = new CompanyModel('','','','','','','','','');
    }
    ngOnInit(): void {   
    }

    register(){
        this.companyRest.register(this.company).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message
                });
                this.router.navigateByUrl('');
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'warning',
                    title: err.error.message || err.error,
                })
            }
            
        })
    }
}