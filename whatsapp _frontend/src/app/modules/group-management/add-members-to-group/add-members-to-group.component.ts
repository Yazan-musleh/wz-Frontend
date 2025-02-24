import { Component, OnInit } from '@angular/core';

import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { GroupService } from 'src/app/services/group.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateGroupActionModalComponent } from '../create-group-action-modal/create-group-action-modal.component';

@Component({
  selector: 'app-add-members-to-group',
  imports: [CardComponent, CommonModule, HttpClientModule],
  templateUrl: './add-members-to-group.component.html',
  styleUrl: './add-members-to-group.component.scss',
  providers: [GroupService]
})
export class AddMembersToGroupComponent implements OnInit {

  selectedGroup: string;
  selectedFile: File | null = null;
 selectedId: any;

  constructor(private groupService: GroupService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchGroups();
  }

  groups = [
    { id: 'loading', groupName: 'Loading...' }
  ];

  onOptionChange(event: Event): void {
    
    this.selectedId = (event.target as HTMLSelectElement).value;
    const selectedGroup = this.groups.find(group => group.id === this.selectedId);
    if (selectedGroup) {
      this.selectedGroup = selectedGroup.groupName; // Display group name in UI
      console.log('Selected Group ID:', this.selectedId); // Log ID in console
    }
  }

  fetchGroups() {
    this.groupService.getGroups().subscribe(
      (data) => {
        this.groups = data;
        if (this.groups.length == 0) {
          this.groups = [
            {id: 'syncing', groupName: 'syncing'}
          ];
          
          this.fetchGroups();
        }
      },
      (error) => {
        console.error('Error fetching groups', error);
      }
    );
  }


  onSubmit() {
    console.log("11" + this.selectedId);

    if (this.selectedFile == null || this.selectedId == null) {
      alert("Please select a group and provide a valid excel file");
      return;
    }

      this.groupService.addMembersToGroup(this.selectedId, this.selectedFile)
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

  onCreateGroup(){
    const modalRef = this.modalService.open(CreateGroupActionModalComponent, {
      size: 'xl',
      backdrop: 'static',
      centered: true,
    });
  }


  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log("Selected file:", file.name);
  //     // Handle file upload logic here
  //   }
  // }

}
