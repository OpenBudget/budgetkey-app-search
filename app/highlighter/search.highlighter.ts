
import {Component, Injectable, Input, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    styles:[`
    .highlight{
        background-color: yellow;
        display: inline-block !important;
    }
    .highlight-child{
        font-size: 13px !important;
        display: inline-block !important;
        font-weight: normal !important;
    }
    `],
    selector: 'search-text-highlighter',
    template: `
    <div *ngIf="titleTextMatch">
        <span>{{ leftSpanText }}</span>
        <span class="highlight">{{ middleSpanText }}</span>
        <span>{{ rightSpanText }}</span>
    </div>
    <div *ngIf="!titleTextMatch">
        <span>{{ titleText }}</span> <span [style.display]="isChildMatch()" [ngClass]="'highlight-child'">{{ textToShowInChildMatch }}</span>
    </div>
    `,
})

@Injectable()
export class Highlighter implements OnInit{

    @Input() titleText : string;
    @Input() indexesToHighlight : number[];  // Search engine returns an ARRAY of 2 - The 1st is the beginning of the highlight position, 2nd is the length of highlight
    @Input() titleTextMatch: boolean;

    highlightLength: number;

    leftSpanText : string;
    middleSpanText : string;
    rightSpanText : string;

    textToShowInChildMatch : string;

    constructor(){ 
        this.titleTextMatch = false;
        this.highlightLength = 0;
    }

    isChildMatch(){
        if (this.titleTextMatch){
            return "none";
        }
        else {
            return "block";
        }
    }

    ngOnInit() {
        this.titleText = this.titleText;
        this.indexesToHighlight = this.indexesToHighlight;

        if (this.titleTextMatch){

            // In case of TITLE match
            this.highlightLength = this.indexesToHighlight[0] + this.indexesToHighlight[1];

            this.leftSpanText = this.titleText.substring(0, this.indexesToHighlight[0]);
            this.middleSpanText = this.titleText.substring(this.indexesToHighlight[0], this.highlightLength);
            this.rightSpanText = this.titleText.substring(this.highlightLength, this.titleText.length);
        } else {

            // In case of CHILD match
            this.textToShowInChildMatch = "נמצאה התאמה בנתונים פנימיים"; //debugger;

        }

    }
}