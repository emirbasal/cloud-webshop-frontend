import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from 'src/app/classes/country';
import { countryNamesInGerman } from 'src/assets/countries/countries_de';
import { countryNamesInEnglish } from 'src/assets/countries/countries_en';


@Component({
  selector: 'cart-user-information',
  templateUrl: './cart-user-information.component.html',
  styleUrls: ['./cart-user-information.component.css']
})
export class CartUserInformationComponent implements OnInit {

  @Input() cartSum: number
  @Output() createOrder = new EventEmitter()
  @ViewChild("cc") creditCartInput: HTMLInputElement

  public informationForm: FormGroup;
  public submitted = false

  public allCountryNamesInGerman: Country[] = countryNamesInGerman

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      card: ["", [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(19)]],
      country: ["", [Validators.required]],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      zip: ["", [Validators.required, Validators.maxLength(10)]],
      name: ["", [Validators.required]],
      address1: ["", [Validators.required]],
      address2: ["", []]
    });
  }

  get formGroupControls(): FormGroup["controls"] {
    return this.informationForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.informationForm.invalid) {
        console.log('informationForm: invalid');
        return;
    }

    this.createOrder.emit({
      cardNumber: this.formGroupControls.card.value.replace(/\s+/g, ''),
      email: this.formGroupControls.email.value,
      country: this.getCountryNameInEnglish(this.formGroupControls.country.value),
      state: this.formGroupControls.state.value,
      city: this.formGroupControls.city.value,
      zip: this.formGroupControls.zip.value,
      address1: this.formGroupControls.name.value,
      address2: this.formGroupControls.address1.value,
      address3: this.formGroupControls.address2.value,
    })
  }


  private getCountryNameInEnglish(code: string): string {
    const countryCodes = countryNamesInEnglish.map((country: Country) => {
      return country.code
    })

    let targetIndex = countryCodes.indexOf(code)

    return countryNamesInEnglish[targetIndex].name
  }

  public onReset(): void {
    this.submitted = false;
    this.informationForm.reset();
  }

  // https://stackoverflow.com/a/61875882
  public handleCreditCards(): void {
    const { card } = this.formGroupControls;
    const { selectionStart } = this.creditCartInput

    let trimmedCardNum = card.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }

    const partitions = [4, 4, 4, 4];

    const numbers = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })

    card.setValue(numbers.join(' '));

    /* Handle caret position if user edits the number later */
    if (selectionStart < card.value.length - 1) {
      this.creditCartInput.setSelectionRange(selectionStart, selectionStart, 'none');
    }
  }

}
