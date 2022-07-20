import { Component, OnInit } from "@angular/core";
import { CompanyAdminModel } from "src/app/models/companyAdmin.model";
import { CompanyAdminRestService } from "src/app/services/companyAdminRest/company-admin-rest";
import Swal from "sweetalert2";

@Component({
    selector: 'app-companies',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit{
    companies: any;
    company: CompanyAdminModel;
    searchCompany: any;
    companyUpdate: any;
    companyUpdate_Admin: any;
    deleteCompany_Admin: any;

    constructor(private companyRest: CompanyAdminRestService,
        )
        {
            this.company = new CompanyAdminModel('','','','','','','','');
        }

        ngOnInit(): void {
            this.getCompanies();
        }

        getCompanies(){
            this.companyRest.getCompanies().subscribe({
                next:(res:any)=>{
                    this.companies = res.companies,
                    console.log(this.companies);
                },
                error: (err)=>console.log(err)
            })
        }

        getCompany(id:string){
            this.companyRest.getCompany(id).subscribe({
                next:(res:any)=>{
                    this.companyUpdate = res.company
                },
                error:(err)=> {alert(err.error.message)}
            })
        }

        registerCompany_Admin(addCompanyForm: any){
            this.companyRest.registerCompany_Admin(this.company).subscribe({
                next: (res:any)=>{
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                    });
                    this.getCompanies();
                    addCompanyForm.reset();
                },
                error:(err:any)=>{
                    Swal.fire({
                        icon: 'error',
                        title: err.error.message || err.error
                    });
                    addCompanyForm.reset();
                },
            })
        }

        updateCompany(){
            this.companyUpdate.password = undefined;
            this.companyRest.updateCompany_Admin(this.companyUpdate._id, this.companyUpdate).subscribe({
                next:(res:any)=>{
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                    });
                    this.getCompanies();
                },
                error:(err)=>{
                    console.log(this.companyUpdate)
                    Swal.fire({
                        icon: 'error',
                        title: err.error.message || err.error,
                    })
                    this.getCompanies()
                },
            })
        }
        
        deleteCompany(id:string){
            this.companyRest.deleteCompany(id).subscribe({
                next:(res:any)=>{
                    Swal.fire({
                        icon: 'success',
                        title: res.message  + ' : ' + res.deleteCompany.name
                    });
                    this.getCompanies();
                },
                error:(err)=>{
                    Swal.fire({
                        icon: 'error',
                        title: err.error.message
                    })
                }
            })
        }
}