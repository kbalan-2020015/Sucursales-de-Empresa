import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  role:any;

  constructor(
    private companyRest: CompanyRestService, private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.companyRest.getToken();
    this.role = this.companyRest.getIdentity().role;
  }

  logOut(){
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Log Out Successfully'
      
    })
    this.router.navigateByUrl('');

  }

} 