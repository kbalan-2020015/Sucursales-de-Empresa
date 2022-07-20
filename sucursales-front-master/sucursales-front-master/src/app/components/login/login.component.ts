import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  company:CompanyModel;

  constructor(private companyRest: CompanyRestService,
              private router: Router) {
    this.company = new CompanyModel('','','','','','','','','');
  }

  ngOnInit(): void {
  }

  login(){
    this.companyRest.login(this.company).subscribe({
      next: (res:any)=>{
       Swal.fire({
         icon: 'success',
         title: res.message + ',Sesión Iniciada'
       })
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.checkUser));
        this.router.navigateByUrl('/home');
      },
      error: (err)=> {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
        })
      }

    })
  }

}
