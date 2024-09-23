import { Directive, HostListener } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
@Directive({
    selector: '[filtrarNumeros]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: solonumeros }]
})
export class solonumeros implements Validator {
    // Método que valida solo números en el formulario
    validate(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;

        // si el valor es null o undefined, no hay error
        if (valor == null || valor == undefined || valor == "" || !valor) {
            console.log(valor);
            console.log("--->si el valor es null");
            return null;
        }
        // expresión regular para validar solo numeros (positivos y sin decimales)
        const regex = /^[0-9]+$/;
        // si el valor cumple con la expresión regular, es valido
        if (regex.test(valor)) {
            console.log(valor);
            console.log("--- si cumple con la expresion solo num");
            return null
        } else {
            // si no cumple, retorna el error
            return { filtarNumeros: true }
        }
    }
    // Bloquear letras y caracteres especiales durante la entrada de datos
    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        const charCode = event.charCode;
        // Permitir solo caracteres numéricos (0-9) y bloquear otros
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }
}