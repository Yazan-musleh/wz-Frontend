import { group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group-action-modal',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-group-action-modal.component.html',
  styleUrl: './create-group-action-modal.component.scss',
  providers: [GroupService]
})

export class CreateGroupActionModalComponent implements OnInit{

  createGroupForm : FormGroup;
  submitted: boolean;
  private destroy$ = new Subject<void>();
  selectedFile: File | null = null;
  
  constructor(
    private groupService: GroupService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
  }

    initializeForm(){
      this.createGroupForm = this.fb.group({
        groupName: ['', Validators.required]
      });
    }


  onCreateFileSelected(event: any) {
    console.log("1" + this.selectedFile);

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

  onSubmit() {

    var groupName: string;
    if (this.createGroupForm.valid) {
      groupName = this.createGroupForm.get('groupName')?.value; // ✅ Fix here
      console.log('Group Created:', groupName);
    }

    if (this.selectedFile == null || groupName == null) {
      alert("Please provide group name and provide a valid excel file");
      return;
    }

    console.log(this.selectedFile);
    
    this.groupService.CreateGroup( groupName, this.selectedFile )
      .subscribe(
        (response) => {
          console.log('Upload successful', response);
          alert('File uploaded successfully!');
          
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'WhatsAppUserData.xlsx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('Upload failed', error);
          alert(error.message);
        }
      );
  }


  Cancel(): void {
    this.createGroupForm.reset({
      groupName: ''
    });
    console.log('Form reset');
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.createGroupForm.controls;
  }

}
