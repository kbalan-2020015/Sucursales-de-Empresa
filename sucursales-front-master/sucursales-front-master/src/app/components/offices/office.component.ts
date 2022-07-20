import { Component, OnInit } from "@angular/core";
import { OfficeRestService } from "src/app/services/officeRest/office-rest.service";
import { OfficeModel } from "src/app/models/office.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-offices',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.css']
})

export class OfficeComponent implements OnInit{

    offices: any;
    idCompany: any;
    office: OfficeModel;
    officeId: any;
    token: any;
    role: any;
    idOffice: any;
    update: any;

    constructor(
        private officeRest: OfficeRestService
    ){
        this.office = new OfficeModel('','','')

    }

    ngOnInit(): void {
        this.getOffices();
    }

    getOffices(){
        this.officeRest.getOffices().subscribe({
            next: (res: any)=> {
                this.offices = res.office,
                console.log(this.office)
            },
            error: (err)=>console.log(err)
        })
    }

    getOffice(id:string){
        this.officeRest.getOffice(id).subscribe({
            next:(res:any)=>{this.officeId = res.office
            console.log(this.officeId);
        },
        error: (err)=> alert(err.error.message)
    })
}
    

    addOffice(addForm:any){
        this.officeRest.addOffice(this.office).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message
                });
                this.getOffices();
                addForm.reset();
            },
            error: (err) => alert(err.error.message)
        })
    }

    updateOffice(){
        this.officeId.company = undefined;
        this.officeRest.updateOffice(this.officeId._id, this.officeId).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message
                })
                console.log(this.officeId);
                this.getOffices();
            },
            error:(err)=> alert(err.error.message || err.error)
        })
    }

    deleteOffice(id:string){
        this.officeRest.deleteOffice(id).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'warning',
                    title: res.message  + ' : ' + res.officeDelete.name
                });
                this.getOffices();
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