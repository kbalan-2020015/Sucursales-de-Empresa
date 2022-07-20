import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userGetId: any;
  public identity: any;
  public ProfileModel: CompanyModel;
  public filesToUpload:any;
  public url:any;

  constructor(
    public CompanyRest: CompanyRestService, 
    private router: Router,
    private uploadImageRest: UploadImageService) {
    this.ProfileModel = new CompanyModel('', '', '', '', '', '', '', '','');
    this.url = environment.baseUrl;
  }
  ngOnInit(): void {}

  updateCompany() {
    this.userGetId = this.CompanyRest.getIdentity();
    this.CompanyRest.updateCompany(
      this.userGetId._id,
      this.ProfileModel
    ).subscribe({
      next: (res: any) => {
        this.identity = res.updateCompany;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
      },
      error: (err) => alert(err.error.message || err.error),
    });
  }

  deleteCompany(id: string) {
    this.CompanyRest.deleteCompany(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'warning',
          title: res.message,
        });
        localStorage.clear();
        this.router.navigateByUrl('');
        //this.get_company();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
        });
      },
    });
  }


  filesChange(inputFile:any){
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage(){
    this.userGetId = this.CompanyRest.getIdentity();
    this.uploadImageRest.requestFiles(this.userGetId._id, this.filesToUpload, 'image')
    .then((res:any)=>{
      if(!res.error){
        console.log(res);
      }else{
        console.log(res)
      }
    })
  }



}
