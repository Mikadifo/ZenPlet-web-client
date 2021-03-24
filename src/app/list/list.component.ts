import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from '../model/owner/owner.model';
import { OwnerService } from '../service/owner.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  listTitle: string = '';
  card: string = '';
  listOwner: Owner[] = [];

  constructor(
    private route: ActivatedRoute,
    private ownerService: OwnerService
  ) {
    this.ownerService.getOwners().subscribe(
      (data) => {
        this.listOwner = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.card = params['card']));
  }
}
