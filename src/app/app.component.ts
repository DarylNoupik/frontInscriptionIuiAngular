import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from './_services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end-inscription-iui';
  routeParams;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private loaderService: LoaderService) {
    this.routeParams = this.route.snapshot.params;
  }

  ngOnInit() {
    this.toastr.success("Inscription éffectuée avec success", 'Inscription réussie');
    console.log("je suis là");

    this.loaderService.isLoading.subscribe({
      next: (loading: boolean) => {
        this.isLoading = loading;
      }
    })
  }
}
