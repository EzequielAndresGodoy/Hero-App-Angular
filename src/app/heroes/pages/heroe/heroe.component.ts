import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators'
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activateRoute: ActivatedRoute,
               private HeroesService: HeroesService,
               private router: Router) { }

  ngOnInit(): void {

    this.activateRoute.params
      .pipe(
        switchMap ( ({id}) => this.HeroesService.getHeroePorId(id) )
      )
      .subscribe( heroe => this.heroe = heroe )

  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }

}
