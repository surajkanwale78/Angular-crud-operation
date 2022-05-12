import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  public loding: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null | null | undefined;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactFromServer();
  }
  public getAllContactFromServer() {
    this.loding = true;
    this.contactService.getAllContacts().subscribe(
      (data: IContact[]) => {
        this.contacts = data;
        this.loding = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loding = false;
      }
    );
  }

  public clickDeleteContact(contactId:any) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe(
        (data: {}) => {
          this.getAllContactFromServer();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
