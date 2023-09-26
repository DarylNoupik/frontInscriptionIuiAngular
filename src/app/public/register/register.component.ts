import { Component, OnInit } from '@angular/core';
import { ICredential } from "../../_interfaces/credential";
import { IUtilisateur } from "../../_interfaces/utilisateur";
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ZoneService } from 'src/app/_services/zone.service';
import { IZone } from 'src/app/_interfaces/izone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: IUtilisateur = {
    name: "",
    prenom: "",
    password: "",
    email: "",
    role: "CANDIDAT",
    id_disponibilite: 0
  };
  confirmPasswordField: string = "";
  showMsgError: boolean = false;
  msgError: string = "";

  step: number = 1;
  zones: IZone[] = [];

  switchStep(step: number) {
    this.step = step;
  }

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private zoneService: ZoneService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form)
      console.log(this.form);
    this.authService.register(this.form).subscribe({
      next: data => {
        console.log(data);
        console.log("Inscription réussie");
        this.toastr.success("Inscription éffectuée avec success", 'Inscription réussie');
        this.login();
      },
      error: err => {
        console.log(err);
        console.log(err.status);
        if (err.status === 200) {
          console.log("Inscription réussie");
          this.toastr.success("Inscription éffectuée avec success", 'Inscription réussie');
          this.login()
        } else {
          this.msgError = "Une erreur s'est produite ! \n Cette adresse mail a été déjà utilisée. \ Veillez vérifier vos informatons, votre connexion internet et réessayez!!!";
          this.showMsgError = true;
          this.toastr.error(this.msgError, 'Inscription échouée');
        }
      }
    });

  }

  login() {
    this.router.navigate(['/auth']);
  }

  getAllZones() {
    this.zoneService.liste().subscribe({
      next: (value) => {
        this.zones = value;
      }
    });
  }

}
