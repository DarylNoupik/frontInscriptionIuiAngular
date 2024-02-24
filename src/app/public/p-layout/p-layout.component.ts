import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-p-layout',
  templateUrl: './p-layout.component.html',
  styleUrls: ['./p-layout.component.css']
})
export class PLayoutComponent implements OnInit {

  userIsConnected: boolean = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    let token: string | null = this.tokenService.getToken();
    if (token != null) {
      if (this.tokenService.isLogged()) {
        this.userIsConnected = true;
      }
    }
  }

}
