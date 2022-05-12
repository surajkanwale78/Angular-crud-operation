import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  public loding: boolean = false;
  public contactId: string | any;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group:IGroup = {} as IGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loding = true;
      this.contactService.getContact(this.contactId).subscribe(
        (data: IContact) => {
          this.contact = data;
          this.loding = false;
          this.contactService.getGroups(data).subscribe((data:IGroup)=> {
            this.group =data;
          })
        },
        (error) => {
          this.errorMessage = error;
          this.loding = false;
        }
      );
    }
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}
