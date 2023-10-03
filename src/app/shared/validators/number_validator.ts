import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasNumber = /^\d+$/.test(value);
        // console.log("test: ", hasNumber);
        return !hasNumber ? { onlyNumber: true } : null;
    }
}