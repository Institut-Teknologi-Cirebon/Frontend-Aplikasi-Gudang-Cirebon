import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCurrencyNumber]'
})
export class CurrencyNumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
    input.value = Number(input.value).toLocaleString('id-ID');
  }

}
