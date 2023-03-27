import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $ : any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    public dialog: MatDialog
    ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor:pointer;");
    _renderer.appendChild(element.nativeElement, img);
  }





  @Input() id:string;
  @Output() callback : EventEmitter<any> = new EventEmitter();

  
  @HostListener("click")
  async onClick() {
     this.openDialog(async()=>{
      const td : HTMLTableCellElement = this.element.nativeElement;
     await this.productService.delete(this.id);
      $(td.parentElement).animate({
        opacity : 0,
        width : 0,
        padding : 0,
        margin : 0
      },
      ()=>{
        this.callback.emit();
      });
    });
  }
  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:'350px',
      data : DeleteState.Yes,
  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes){
        afterClosed();
      }
    });
  }
    // const img = HTMLImageElement = event.srcElement;
    // $(img.parentElement.parentElement).animate({
    //   opacity: 0,
    //   width: 0,
    //   padding: 0,
    //   margin: 0
    // });
  }

