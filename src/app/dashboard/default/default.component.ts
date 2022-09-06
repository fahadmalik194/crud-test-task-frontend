import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/shared-services/http.service';
import Swal from 'sweetalert2';

interface interfaceBioDataDetails {
  id: number;
  name: string;
  fatherName: string;
  cnic: string;
  domicile: string;
  image: string;
}

interface interfaceBioDataAddDetails {
  name: string;
  fatherName: string;
  cnic: string;
  domicile: string;
  image: string;
}

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  akomaLoaderFlag: boolean = false;
  currentUserDetail: any;

  domicileDataArray: any;
  bioDataArray: any;
  submitted: boolean = false;

  addRecordDataObj: interfaceBioDataAddDetails = {
    name: '',
    fatherName: '',
    cnic: '',
    domicile: '',
    image: '',
  };

  uploadedImageAdd;

  tempBioDataObj: interfaceBioDataDetails = {
    id: 0,
    name: '',
    fatherName: '',
    cnic: '',
    domicile: '',
    image: '',
  };

  bioDataAddForm: FormGroup;
  bioDataUpdateForm: FormGroup;

  files: File[] = [];

  disableSubmit: boolean = true;

  constructor(private formBuilder: FormBuilder, private http: HttpService) {
    this.currentUserDetail = localStorage.getItem('currentUser');
    this.currentUserDetail = JSON.parse(this.currentUserDetail);
    this.bioDataUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      father_name: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      domicile: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

    this.getAllDomicile();
    this.getAllRecord();
  }

  ngOnInit(): void {
    this.basicForm();
  }

  get f() {
    return this.bioDataAddForm.controls;
  }

  basicForm() {
    this.bioDataAddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      cnic: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
      domicile: ['', [Validators.required]],
    });
  }

  addRecord() {
    this.submitted = true;
    const closeBtn = document.getElementById('closeAddFormModal');
    if (this.bioDataAddForm.invalid) {
      return;
    }
    this.addRecordDataObj = this.bioDataAddForm.value;
    this.addRecordDataObj['image'] = this.uploadedImageAdd;
    this.addRecordDataObj['creatorId'] = this.currentUserDetail.id;
    console.log('Updated Form Values', this.addRecordDataObj);
    this.http.postRequest('/bioData/create', this.addRecordDataObj).subscribe(
      (response: any) => {
        // Closing Modal
        closeBtn.click();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Record Added',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllRecord();
      },
      (error) => {
        console.log('Error in creating bio data', error);
      }
    );
  }

  onCancel(event) {
    this.submitted = false;
    this.disableSubmit = true;
    this.bioDataAddForm.reset();
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUploadImage(event: any) {
    this.akomaLoaderFlag = true;
    this.files.push(...event.addedFiles);
    const file: File = event.addedFiles[0];
    if (this.files.length > 1) this.replaceFile();
    this.http.uploadFile(file).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(event);
        } else if (event.type === HttpEventType.Response) {
          this.akomaLoaderFlag = false;
          this.disableSubmit = false;
          this.uploadedImageAdd = event.body.data.Location;
        }
      },
      (err) => {}
    );
  }

  replaceFile() {
    this.files.splice(0, 1); // index =0 , remove_count = 1
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getAllRecord() {
    this.akomaLoaderFlag = true;
    this.http.postRequest('/bioData/read/all/data', {}).subscribe(
      (response: any) => {
        this.akomaLoaderFlag = false;
        this.bioDataArray = response;
      },
      (error) => {
        console.log('Error in getting all bio data', error);
      }
    );
  }

  fetchDataAgainstID(id: any) {
    this.getRecordById(id);
  }

  getRecordById(id: any) {
    this.http.postRequest(`/bioData/read/${id}`, {}).subscribe(
      (response: any) => {
        this.tempBioDataObj = response;
      },
      (error) => {
        console.log('Error in getting bio data by id', error);
      }
    );
  }

  loadTempBioData(data: any) {
    this.tempBioDataObj = data;
  }

  updateRecord(id: any) {
    console.log('Inside Update Record Func', id);
  }

  deleteRecord(id: any) {
    console.log('Inside Delete Record Func', id);
  }

  getAllDomicile() {
    this.http.postRequest('/domicile/read/all/data', {}).subscribe(
      (response: any) => {
        this.domicileDataArray = response;
      },
      (error) => {
        console.log('Error in getting all domicile', error);
      }
    );
  }
}
