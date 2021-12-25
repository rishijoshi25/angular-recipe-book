import { Directive, HostListener, HostBinding, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  //@HostListener('click') toggleOpen() {
  //  this.isOpen = !this.isOpen;
  //}

  //Code for closing the dropdown by clicking anywhere on the screen
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}