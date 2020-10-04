import { Component, OnInit} from '@angular/core';

import { Order } from '../../shared/models/order.model'
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  public currentOrder:Order;

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.currentOrder=this.AdminService.currentOrder;
  }

}
