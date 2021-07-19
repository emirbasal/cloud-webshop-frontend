import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from 'src/app/classes/product'
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  @Output() createProduct = new EventEmitter()

  private isLoadingSub: Subscription = Subscription.EMPTY
  public isLoading: boolean = false

  public informationForm: FormGroup;
  public submitted = false
  public image: string;
  public testSubject = new BehaviorSubject(null)

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      amount: ["", [Validators.required, Validators.pattern(/^\d+\.\d{2}$/), Validators.maxLength(12)]],
      description: ["", [Validators.required]],
      image: ["", [Validators.required]]
    })
    this.isLoadingSub = this.adminService.getIsLoading().subscribe((isLoading: boolean) => {
      this.isLoading = isLoading
    })
  }

  get getFormGroup(): FormGroup["controls"] {
    return this.informationForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.informationForm.valid) {
      let product: Product = {
        id: null,
        name: this.getFormGroup.name.value,
        // TODO: MAKE GLOBALLY CHANGEABLE
        currency: 'EUR',
        description: this.getFormGroup.description.value,
        amount: this.getFormGroup.amount.value * 100,
        image: this.image,
        createdAt: null,
        updatedAt: null
      }
      this.isLoading = true
      this.adminService.createProduct(product)

      this.onReset()
    } else {
      console.log('informationForm: invalid');
    }
  }

  public onReset(): void {
    this.submitted = false;
    this.informationForm.reset();
  }

  public setImage(image: any) {
    let base64Image = image.split("base64,")
    this.image = base64Image[1]
  }

  public onFileChanged(event: any) {
    const image = event.target.files[0]

    if (!image) {
      return
    } else if (image.size >= 300000) {
      console.log("Image is too large")
      this.getFormGroup.image.reset()
      this.toastr.error("Das ausgewählte Bild is zu groß. Bitte wähle ein kleineres Bild (>= 300 KB)");

    } else {
      this.getBase64(image).then(imageAsString => {
        this.setImage(imageAsString)
      })
      this.getBase64(image).catch(error => {
        console.log(error)
      })
    }

  }

  public getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  ngOnDestroy() {
    this.isLoadingSub.unsubscribe()
  }

}
