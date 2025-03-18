import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-send-messages',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './send-messages.component.html',
  styleUrl: './send-messages.component.scss',
  providers: [MessagesService]
})
export class SendMessagesComponent {

  messageContent: string = '';
  selectedFile: File | null = null;

  constructor( private _messageService: MessagesService){}

  sendMessage() {
    if (this.messageContent.trim()) {
      {
        if (this.selectedFile == null) {
          alert("Please select a group and provide a valid excel file");
          return;
        }

        this._messageService.SendMessage(this.messageContent, this.selectedFile)
          .subscribe(
            (response) => {
              console.log('Upload successful', response);
              alert('File uploaded successfully!');

            },
            (error) => {
              console.error('Upload failed', error);
            }
          );
      }
    } else {
      alert("Please enter a message.");
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'xls' || fileType === 'xlsx') {
        this.selectedFile = file;
      } else {
        alert('Only Excel files (.xls, .xlsx) are allowed.');
        event.target.value = ''; // Reset file input
      }
    }
  }
  
}
