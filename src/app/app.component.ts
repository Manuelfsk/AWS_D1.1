import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'D1.1-Esfuerzos';

  PSI: number | null = null;; // valor en Psi según la clasificación del electrodo
  MPA: number | null = null;
  THETA: number | null = null;
  resultadoFv: number | null = null


  // Método para convertir de Psi a Mpa
  ConvertirPsiaMpa() {
    if (this.PSI === null) {
      console.error('Primero debe convertir psi a MPa.');
      return;
    }
    const factorConversion = 145.0377;
    this.MPA = parseFloat((this.PSI / factorConversion).toFixed(4));
    console.log(this.ConvertirPsiaMpa);
    console.log(this.PSI);
    this.CalEsfuerzoFv()
  }
  

  CalEsfuerzoFv() {
    if (this.MPA === null) {
      console.error('error MPA');
      return;
    }
    if (this.THETA === null) {
      console.error('ERROR theta');
      return;
    }
    const thetaRad = this.THETA * (Math.PI / 180);
    const operacionParentesis = Math.sin(1.5 * thetaRad);
    this.resultadoFv = 0.30 * this.MPA * (1.0 + 0.5 * operacionParentesis)
    console.log('mpa', this.MPA);
    console.log('fv',this.resultadoFv);
    console.log('theta',this.THETA);
    
    
    
  }



}
