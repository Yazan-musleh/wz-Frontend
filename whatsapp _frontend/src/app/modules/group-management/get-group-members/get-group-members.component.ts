import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-get-group-members',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './get-group-members.component.html',
  styleUrl: './get-group-members.component.scss',
  providers: [GroupService]
})
export class GetGroupMembersComponent {

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
            {id: 'syncing', groupName: 'syncing... please wait'}
          ];
          
          this.fetchGroups();
        }
      },
      (error) => {
        console.error('Error fetching groups', error);
      }
    );
  }

  onSubmit(){
    this.groupService.getGroupParticipant(this.selectedId)
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
        }
      );
  }
}
