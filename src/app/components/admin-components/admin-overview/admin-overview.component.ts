import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/classes/order';
import { Product } from 'src/app/classes/product';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})
export class AdminOverviewComponent implements OnInit, OnDestroy {

  public currency: string = "EUR"

  public products: Product[] = []
  public outcome: any = null
  public orders: Order[] = []

  public isLoading: boolean = false

  private productsLoaded: boolean = false
  private ordersLoaded: boolean = false
  private outcomeLoaded: boolean = false

  private productsSub: Subscription = Subscription.EMPTY

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = true

    this.productsSub = this.adminService.getProducts().subscribe((products: Product[]) => {
      if (products != null) {
        this.products = products
        this.productsLoaded = true
        this.checkIfLoaded()
      }
    })

    this.adminService.getOutcome().subscribe((outcome: any) => {
      this.outcome = outcome
      this.toastr.success('Umsatzdaten wurden geladen', 'Admin')
      this.outcomeLoaded = true

      this.checkIfLoaded()
    }, error => {
      this.toastr.error('Umsatzdaten wurden nicht geladen', 'Admin')
    })

    this.adminService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders
      this.toastr.success('Alle Bestellungen wurden geladen', 'Admin')
      this.ordersLoaded = true

      this.checkIfLoaded()
    }, error => {
      this.toastr.error('Bestellungen wurden nicht geladen', 'Admin')
    })
  }

  private checkIfLoaded(): void {
    if (this.ordersLoaded && this.outcomeLoaded && this.productsLoaded) {
      this.isLoading = false
    }
  }

  public deleteProduct(id: string): void {
    this.adminService.deleteProduct(id)
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe()
  }
}
