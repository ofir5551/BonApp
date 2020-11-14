import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { Order } from '../../shared/models/order.model'
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  public currentOrder:Order;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.currentOrder=this.adminService.currentOrder;
  }

  showNote(message){
    Swal.fire({
    title: 'Order Note :',
    icon: 'info',
    text: message,
    })
  }

}
