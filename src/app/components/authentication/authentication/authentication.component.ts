import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/classes/account';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @Output() login = new EventEmitter()

  public informationForm: FormGroup;

  public isLoading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }


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

      this.authenticate(account)
    } else {
      console.log('informationForm: invalid');
    }
  }

  private authenticate(account: Account): void {
    this.isLoading = true
    this.authService.authenticate(account).subscribe((response: any) => {
      let token:string = response.token
      if (token.length > 0) {
        this.toastr.success('Erfolgreich authentifiziert', 'Login')
        localStorage.setItem("token", token)
        this.router.navigate(['admin/overview'])
        this.onReset()
        this.isLoading = false

        this.login.emit()
        this.authService.notifyAuthentication(true)
      } else {
        this.toastr.error('Username oder Passwort falsch', 'Login')
        this.isLoading = false
        this.authService.notifyAuthentication(false)
        return
      }

      setTimeout(() => {
        }, 1500)
      }, error => {
        console.log(error)
        this.toastr.error('Konnte nicht authentifizert werden', 'Login')
        this.isLoading = false
        this.authService.notifyAuthentication(false)
      })
  }



  public onReset(): void {
    this.informationForm.reset();
  }

}
