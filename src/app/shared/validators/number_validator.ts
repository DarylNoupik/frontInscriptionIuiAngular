import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createCamerounianNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const regExp = new RegExp(/^6(5|7|8|9)[0-9]{7}$/);
    const regExpAll = new RegExp(/^[0-9]{9}$/);

    if (regExp.test(value) || regExpAll.test(value)) {
      return null;
    } else {
      return {
        notConform: true,
      };
    }
  };
}

export function createInternationalNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const phoneInterNumberRegex = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/;

    if (phoneInterNumberRegex.test(value)) {
      return null;
    } else {
      return {
        notConform: true,
      };
    }
  };
}

export function createStringValidatior(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    let spaceCheck = /^ *$/;
    if (spaceCheck.test(value)) {
      return {
        notConform: true,
      };
    }

    let numberCheck = /^\d+$/;
    if (numberCheck.test(value)) {
      return {
        notConform: true,
      };
    }

    return null;
  };
}

export function emailValidatior(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    let emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailCheck.test(value)) {
      return {
        notConform: true,
      };
    }

    return null;
  };
}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    let date = new Date(value);

    let dateCurrent = new Date();

    let dateBefore15 = new Date();
    dateBefore15.setFullYear(dateCurrent.getFullYear() - 15);

    let dateBefore30 = new Date();
    dateBefore30.setFullYear(dateCurrent.getFullYear() - 30);

    if (date.getTime() > dateBefore15.getTime()) {
      return {
        max: true,
      };
    }

    if (date.getTime() < dateBefore30.getTime()) {
      return {
        notConform: true,
      };
    }

    return null;
  };
}
