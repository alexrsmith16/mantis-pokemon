import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private location: Location
    ) {
      console.log("location:");
      console.log(this.location.path());
    }

  ngOnInit(): void {
  }

}
