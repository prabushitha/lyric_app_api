import { Component } from '@angular/core';

@Component({
  selector: 'read-more',
  template: `
        <div [class.collapsed]="isCollapsed">
            <ng-content></ng-content>
        </div>
        <a (click)="isCollapsed =! isCollapsed">Read more</a>
    `,
    styles: [`
        div.collapsed {
            height: 60px;
            overflow: hidden;
        }
    `]
})
export class ReadMoreComponent {
  isCollapsed: boolean = true;
}
