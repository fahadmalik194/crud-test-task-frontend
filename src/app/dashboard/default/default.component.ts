import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/shared-services/http.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  currentUser: any;
  domicileDataArray: any;
  bioDataAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpService) {
    this.bioDataAddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      father_name: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      domicile: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.getAllDomicile();
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
  }

  get f() {
    return this.bioDataAddForm.controls;
  }

  addRecord() {
    console.log('Inside Add Record Func');
  }
  getAllRecord() {}

  getRecordById() {}

  updateRecord() {}

  deleteRecord() {}

  getAllDomicile() {
    this.http.postRequest('/domicile/read/all/data', {}).subscribe(
      (response: any) => {
        this.domicileDataArray = response;
        console.log('domicileDataArray', this.domicileDataArray);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
