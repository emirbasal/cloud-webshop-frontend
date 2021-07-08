import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cart-user-information',
  templateUrl: './cart-user-information.component.html',
  styleUrls: ['./cart-user-information.component.css']
})
export class CartUserInformationComponent implements OnInit {

  @Input() cartSum: number
  @ViewChild("cc") creditCartInput: HTMLInputElement

  public informationForm: FormGroup;
  public submitted = false

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      card: ["", [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(17)]]
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

    console.log(this.f.card.value.replace(/\s+/g, ''))

    /// this.userInformation.emit(this.f.name.value);

    this.onReset();
  }

  public onReset(): void {
    this.submitted = false;
    this.informationForm.reset();
  }

  // https://stackoverflow.com/a/61875882
  public handleCreditCards(): void {
    const { card } = this.f;
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
