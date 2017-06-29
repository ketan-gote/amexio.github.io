/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import {Input, OnInit, forwardRef, Component, AfterViewInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormInputBase} from "../baseclass/form.base.class";
declare var $;
const noop = () => {
};

export const CUSTOM_TEXT_AREA_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaComponent),
    multi: true
};

export const BASE_IMPL_TEXTAREA_INPUT : any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => TextAreaComponent)
};

@Component({
    selector: 'amexio-textarea-input',
    template : `<div [attr.class]="divCss">

        <ng-container *ngIf="hasLabel">
            <label [attr.for]="elementId"
                   [style.font-style]="fontStyle"
                   [style.font-family]="fontFamily"
                   [style.font-size]="fontSize"
                   class="control-label">
                {{fieldLabel}}
            </label>
        </ng-container>

        <textarea type="text"
                  (blur)="onBlur()"
                  autocomplete="off"
                  class="form-control"
                  [(ngModel)]="value"
                  [attr.fieldName] = "fieldName"
                  [attr.rows]="noOfrows"
                  [attr.cols]="noOfCols"
                  [attr.id]="elementId"
                  [attr.placeholder]="placeholder"
                  [attr.disabled] = "disabled ? true: null"
                  [required]="allowBlank ? true: null"
                  [attr.data-error]="errorMsg"
                  [attr.aria-describedby]="spanId"
                  data-toggle="popover" title="Info" [attr.data-placement]="popoverPlacement"  data-trigger="focus"  data-html="true"  [attr.data-content]="helpInfoMsg"

        >

        </textarea>

        <ng-container *ngIf="iconFeedBack">
            <span [attr.class]="iconClassName" aria-hidden="true"></span>
            <span [attr.id]="spanId" class="sr-only">({{iconName}})</span>
        </ng-container>

        <ng-container *ngIf="!iconFeedBack">
            <i [class]="fieldglyphIcon"></i>
        </ng-container>

        <div class="help-block with-errors"></div>

    </div>
    `,
    providers : [CUSTOM_TEXT_AREA_INPUT_CONTROL_VALUE_ACCESSOR,BASE_IMPL_TEXTAREA_INPUT]
})

export class TextAreaComponent extends FormInputBase implements OnInit,ControlValueAccessor,AfterViewInit {

    @Input()    fieldLabel : string;

    @Input()    fieldName : string;

    @Input()    allowBlank : string;

    @Input()    errorMsg : string;

    @Input()    disabled : boolean;

    @Input()    noOfrows : number;

    @Input()    noOfCols : number;

    @Input()   placeholder: string;

    @Input()   iconFeedBack : boolean;

    @Input()   fontStyle : string;

    @Input()   fontFamily : string;

    @Input()   fontSize : string;

    @Input()   fieldIcon : string;

    @Input()   hasLabel : boolean = true;

    @Input()   pattern : string;

    @Input()   popoverPlacement : string;

    elementId: string;

    spanId : string;

    iconName : string;

    helpInfoMsg: string;

    isValid: boolean;

    divCss : string;

    iconClassName : string;

    fieldglyphIcon : string;

    regEx : RegExp ;



    constructor() {
      super();
      this.elementId = 'input-text-' + new Date().getTime() + Math.random();
      this.spanId = 'span-msg-'+ Math.random();

      if(this.iconFeedBack)
        this.divCss = 'form-group has-feedback';
      else
        this.divCss = 'form-group has-feedback has-feedback-left';
    }

    ngOnInit() {
        if(this.errorMsg)
            this.helpInfoMsg = this.errorMsg +'<br/>';

      if(!this.iconFeedBack)
        this.fieldglyphIcon = 'form-control-feedback glyphicon glyphicon-'+this.fieldIcon;

        //Regex check
        if(this.pattern !=null){
            this.regEx = new RegExp(this.pattern);
        }
        if(this.popoverPlacement == null){
            this.popoverPlacement = 'bottom';
        }
    }

    ngAfterViewInit(){
        $('[data-toggle="popover"]').popover();
    }

    //The internal dataviews model
    private innerValue: any = '';

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
        this.validate();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


    validate(){
        this.isValid = this.isValidInput();

    }

    isValidInput(){
        var hasError = false;
        if((this.allowBlank && (!this.value || this.value.length==0))){
            hasError = true;
        }
        else if(this.pattern != null && !this.regEx.test(this.value)){
            hasError = true;
        }

        if(hasError){
          this.setValidClassNames();
        }else{
          this.setInvalidatedClassNames();
        }

        return hasError;
    }

    setValidClassNames(){
      this.divCss = 'form-group has-error has-feedback';
      this.iconName = 'error';
      this.iconClassName = 'glyphicon glyphicon-remove form-control-feedback';
    }

    setInvalidatedClassNames(){
      this.divCss = 'form-group has-success has-feedback';
      this.iconName = 'success';
      this.iconClassName = 'glyphicon glyphicon-ok form-control-feedback';
    }

}
