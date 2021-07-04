import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cart-user-information',
  templateUrl: './cart-user-information.component.html',
  styleUrls: ['./cart-user-information.component.css']
})
export class CartUserInformationComponent implements OnInit {

  public informationForm: FormGroup;
  public submitted = false

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      email: [null, Validators.required],
      card: [null, [Validators.required, Validators.max(16)]]
    });
  }

  get f(): FormGroup["controls"] {
    return this.informationForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.informationForm.invalid) {
        console.log('informationForm: invalid');
        return;
    }

    /// this.userInformation.emit(this.f.name.value);

    this.onReset();
  }

  public onReset(): void {
    this.submitted = false;
    this.informationForm.reset();
  }

}
