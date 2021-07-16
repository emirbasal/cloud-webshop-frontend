import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/classes/account';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public informationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    })
  }

  get getFormGroup(): FormGroup["controls"] {
    return this.informationForm.controls;
  }

  public onSubmit(): void {

    if (this.informationForm.valid) {
      let account: Account = {
        username: this.getFormGroup.username.value,
        password: this.getFormGroup.password.value
      }

      this.authService.authenticate(account)
      this.onReset()
    } else {
      console.log('informationForm: invalid');
    }
  }


  public onReset(): void {
    this.informationForm.reset();
  }

}
