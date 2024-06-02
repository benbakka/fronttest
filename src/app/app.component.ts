
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterViewInit{
  title = 'itraneFront';
  @ViewChild('innerModal') innerModalRef!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const button = this.elementRef.nativeElement.querySelector("button[data-dismiss-modal='modal2']");
    if (button) {
      button.addEventListener('click', () => {
        const innerModal = this.innerModalRef.nativeElement;
        if (innerModal) {
          (innerModal as any).modal('hide');
        }
      });
    }
  }
}
