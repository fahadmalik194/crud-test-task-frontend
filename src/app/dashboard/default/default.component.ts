import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/shared-services/http.service';

interface interfaceBioDataDetails {
  id: number;
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
  akomaLoaderFlag: boolean = true;
  currentUserDetail: any;

  domicileDataArray: any;
  bioDataArray: any;

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

  constructor(private formBuilder: FormBuilder, private http: HttpService) {
    this.currentUserDetail = localStorage.getItem('currentUser');
    this.currentUserDetail = JSON.parse(this.currentUserDetail);
    this.bioDataAddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      father_name: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      domicile: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
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

  ngOnInit(): void {}

  get f() {
    return this.bioDataAddForm.controls;
  }

  addRecord() {
    console.log('Inside Add Record Func');
  }

  onRemove(event: any) {
    console.log(event);
    //this.files.splice(this.files.indexOf(event), 1);
  }

  getAllRecord() {
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
