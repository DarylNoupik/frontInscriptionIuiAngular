import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUtilisateurResponseModel } from 'src/app/_interfaces/utilisateur-response-model';
import { TokenService } from 'src/app/_services/token.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-p-layout',
  templateUrl: './p-layout.component.html',
  styleUrls: ['./p-layout.component.css']
})
export class PLayoutComponent implements OnInit {

  public candidat : IUtilisateurResponseModel = {
    id: 0,
    name: "",
    prenom: "",
    password: "",
    email: "",
    telephone: 0,
    role: "",
    id_disponibilite: 0,
    idZone : 0
  };

  userIsConnected: boolean = false;
  constructor(
    private tokenService: TokenService,
    private  router : Router,
    private  userService : UsersService
    ) { }

  ngOnInit(): void {

    let email = this.tokenService.getEmail();
    this.userService.getUserByEmail(email).subscribe(
      data => {
        console.log(data);
          this.candidat = data;

      },
      error => console.log(error)
    );

    let token: string | null = this.tokenService.getToken();
    if (token != null) {
      if (this.tokenService.isLogged()) {
        this.userIsConnected = true;
      }
    }
  }

  logout():void {
    let alert =  confirm("Voulez-vous vraiment vous déconnectez ?");
    if(alert){
      this.userIsConnected = false;
      this.router.navigate(['/home']);
      this.tokenService.clearToken();
      this.userService.clearID();
      this.userService.clearHaveCandidature();
    }else{
      console.log("tes");
    }
  }

}
