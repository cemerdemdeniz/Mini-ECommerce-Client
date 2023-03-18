import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor(spinner : NgxSpinnerService,private httpClientService : HttpClientService){
    super(spinner)
  }

  ngOnInit():void{
    this.showSpinner(SpinnerType.BallScaleMultiple);
    this.httpClientService.get<Product[]>({
      controller:"products"
    }).subscribe(data =>{console.log(data)
      
    } );

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"Pen",
    //   stock:100,
    //   price:15
    // }).subscribe()
    // this.httpClientService.put({
    //   controller : "products",
    // },{
    //   id : "dac0e5c5-fbde-42e1-ab38-aee3d81703bd",
    //   name : "Colorful Pen",
    //   stock : 500,
    //   price : 5.5
    // }).subscribe()
    // this.httpClientService.delete({
    //   controller:"products",
    // },"80744e4a-3bba-4aa6-9bad-a0194bebc8cd").subscribe();
        
         
   }


}
