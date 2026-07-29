import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-message-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class MessageError {
    @Input() 
    message:string = "";

    @Input() 
    show_message:boolean = false;

    @Output() 
    cerrar_message = new EventEmitter<void>();

    close_error(){
      this.cerrar_message.emit();
    }
}

