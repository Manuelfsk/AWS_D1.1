import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'WeldDesign';

  PSI: number | null = null
  MPA: number | null = null;
  THETA: number | null = null
  RHO: number | null = null;
  wPie: number | null = null
  mili: number | null = null;
  Ri: number | null = null
  resultadoFv: number | null = null;
  resulFvi: number | null = null;
  resmDelta: number | null = null;
  resUDelta: number | null = null;
  resulRHO: number | null = null;
  resulRcrit: number | null = null;
  resulIDelta: number | null = null;
  RhoResultado: number | null = null;
  frho: number | null = null;
  Fvi: number | null = null;
  comp_Fvix: number | null = null;
  comp_Fviy: number | null = null;
  Fvx: number | null = null;
  Fvy: number | null = null;

  /////////////////////////////////////////////
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
  /////////////////////////////////////////////
  //Método para calcular Fv
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
    this.resultadoFv = parseFloat((0.30 * this.MPA * (1.0 + 0.5 * operacionParentesis)).toFixed(4))

    console.log('mpa', this.MPA);
    console.log('fv', this.resultadoFv);
    console.log('theta', this.THETA);
  }
  ///////////////////////////////////////////////
  // convertir pulgada a milimetro
  ConverIncheamili() {
    if (this.wPie === null) {
      console.error("no se muesta el wpie");
      return;
    }
    const number_Wpie = this.wPie !== null ? Number(this.wPie) : 0
    const incheAmili = 25.4;
    this.mili = parseFloat((number_Wpie * incheAmili).toFixed(4))
    console.log('mm: ', this.ConverIncheamili);
    console.log('wpie', number_Wpie);
  }
  //////////////////////////////////////////////
  // relación de la deformación del elemento “i” a la deformación en un elemento a máximo esfuerzo ρ
  deformacionRHO() {
    if (this.Ri === null) {
      return;
    }
    if (this.THETA === null) {
      return;
    }
    if (this.mili === null) {
      return;
    }
    // Convertir los valores a número si no son nulos y son cadenas
    const numbtheta = this.THETA !== null ? Number(this.THETA) : 0
    const numbermili = this.mili !== null ? Number(this.mili) : 0
    const number_Ri = this.Ri !== null ? Number(this.Ri) : 0

    this.resmDelta = parseFloat((0.209 * Math.pow(numbtheta + 6, -0.32) * numbermili).toFixed(4));
    this.resUDelta = parseFloat((1.087 * Math.pow((numbtheta + 6), -0.65) * numbermili).toFixed(4));

    this.resulRcrit = parseFloat((this.resUDelta / number_Ri).toFixed(4));
    this.resulIDelta = parseFloat((number_Ri * this.resUDelta / this.resulRcrit).toFixed(4));

    this.RhoResultado = parseFloat((this.resulIDelta / this.resmDelta).toFixed(4))
    console.log('theta', this.THETA);
    console.log('Ri', number_Ri);
    console.log('mili', this.mili);
    console.log('mDelta', this.resmDelta);
    console.log('uDelta', this.resUDelta);
    console.log('Rcrit', this.resulRcrit);
    console.log('iDelta', this.resulIDelta);
    console.log('p', this.RhoResultado);
    console.log('exponente -0.32', Math.pow(numbtheta + 6, -0.32));
    console.log('theta + 6', numbtheta + 6,);
    console.log('number theta', numbtheta);

    // falta agragar la formula F(p) F(ρ) = [ρ (1.9 – 0.9ρ)]0.3
  }
  ///////////////////////////////////////////
  // calcular esfuerzo Fvi
  calcularFvi() {
    if (this.RhoResultado === null) {
      return;
    }
    if (this.resultadoFv === null) {
      return;
    }
    if (this.THETA === null) {
      return;
    }
    this.frho = parseFloat(Math.pow(this.RhoResultado * (1.9 - 0.9 * this.RhoResultado), 0.3).toFixed(4))
    console.log('f(p)-->', this.frho);
    this.Fvi = parseFloat((this.resultadoFv * this.frho).toFixed(4))
    console.log('Fvi-->', this.Fvi);
    this.comp_Fvix = parseFloat((this.Fvi * Math.cos(this.THETA)).toFixed(4))
    this.comp_Fviy = parseFloat((this.Fvi * Math.sin(this.THETA)).toFixed(4))
    this.Fvx = this.comp_Fvix
    this.Fvy = this.comp_Fviy

  }


}
