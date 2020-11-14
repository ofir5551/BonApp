import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../../shared/models/menu-item.model';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../../shared/services/order.service'
import { saveAs } from 'file-saver';
import { MenuService } from 'src/app/shared/services/menu.service';




@Component({
  selector: 'app-menumanageritem',
  templateUrl: './menumanageritem.component.html',
  styleUrls: ['./menumanageritem.component.css']
})
export class MenumanageritemComponent implements OnInit {
  @Input() item: MenuItem;

  
  constructor(private menuService:MenuService, private http: HttpClient, private orderService:OrderService) { }

  ngOnInit(): void {

  }


  removeItem(){
    this.menuService.removeItemMenu(this.item._id).subscribe((res) => {
      this.menuService.getAllMenu();
    },(errResponse) => console.log(errResponse.error.error));
  }

}
