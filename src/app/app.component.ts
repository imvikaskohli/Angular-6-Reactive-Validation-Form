import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    genders=['male','female', 'other'];

    @ViewChild('regForm') myRegForm;

    constructor(
      private formBuilder: FormBuilder,
      private toastr: ToastrService
      ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required,   Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            'gender': ['', Validators.required],
            'hobbies':new FormArray([])
        });
    }

    // convenience getter for easy access to form fields, if not used then in html we can use like
    // form.get('identity').touched"
    get f() { return this.registerForm.controls; }


    onAddHobby(){
      const control=new FormControl(null,Validators.required);
      (<FormArray>this.registerForm.get('hobbies')).push(control);
    }


    remDetails(index: number, type: string){
        const control = <FormArray>this.registerForm.controls[type];
      // remove the chosen row
      control.removeAt(index);
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.myRegForm.resetForm();
        this.submitted = false;
        this.toastr.success("Registration Successfull");
    }
}
