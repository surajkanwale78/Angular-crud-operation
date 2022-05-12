import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  public loding: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loding = true;
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe(
        (data: IContact) => {
          this.contact = data;
          this.loding = false;
          this.contactService.getAllGroups().subscribe((data: IGroup[]) => {
            this.groups = data;
          });
        },
        (error) => {
          this.errorMessage = error;
          this.loding = false;
        }
      );
    }
  }
  public submitUpdate() {
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe(
        () => {
          this.router.navigate(['./']).then();
        },
        (error) => {
          this.errorMessage = error;
          this.router.navigate(['/contact/edit/${this.contactId}']).then();
        }
      );
    }
  }
}
