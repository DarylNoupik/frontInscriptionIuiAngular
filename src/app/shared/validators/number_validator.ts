import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createCamerounianNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const regExp = new RegExp(/^6(5|7|8|9)[0-9]{7}$/);

        if (regExp.test(value)) {
            return null;
        } else {
            return {
                notConform: true
            };
        }
    }
}
export function createInternationalNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }
console.log('data');

        const phoneInterNumberRegex = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/;

        if (phoneInterNumberRegex.test(value) ) {
            return null;
        } else {
            return {
                notConform: true
            };
        }
    }
}