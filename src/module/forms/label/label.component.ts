/**
 * Created by pratik on 7/2/18.
 */

/*
 Component Name : Amexio Label
 Component Selector :  <'amexio-label>
 Component Description :Amexio Label can be easily wrapped around any text and configure using the different responsive styling
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
 selector: 'amexio-label',
 template: `
  <label class="label-content {{styleClass}}"
    [ngStyle]="{'color' : fontColor}">
    
    <ng-content></ng-content>
    <span class="label-badge" *ngIf="badge">{{badge}}</span>
    
  </label>
 
  `
})

export class AmexioLabelComponent implements OnInit {
/*
Properties 
name : badge
datatype : number
version : 4.1.9 onwards
default : none
description : Badge Value for Label.
*/ 
@Input('badge') badge: number;
/*
Properties 
name : size
datatype : string
version : 4.0 onwards
default : small
description : Responsive Font size, large,medium,small & large-bold,medium-bold,small-bold
*/ 
 @Input('size')  styleClass : 'large' | 'medium' | 'small' | 'bold' | 'large-bold' | 'medium-bold' | 'small-bold';
/*
Properties 
name : font-color
datatype : string
version : 4.0 onwards
default : small
description : Font color of label
*/ 
 @Input('font-color')   fontColor : string;
 
 constructor() { }

 ngOnInit() {
   if(this.styleClass == null)
     this.styleClass = 'small';  
 }
}
