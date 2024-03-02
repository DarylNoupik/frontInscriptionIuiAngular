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

export function orangeCameroonNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // La validation réussit si la valeur est vide
    }

    // Expression régulière pour valider les numéros Orange Cameroun
    const regExp = new RegExp(/^(69\d{7}|65[5-9]\d{6})$/);

    if (regExp.test(value)) {
      return null; // La validation réussit si la valeur correspond à l'expression régulière
    } else {
      return { notOrangeCameroon: true }; // Une erreur de validation est renvoyée si la valeur ne correspond pas
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

export function dateTransactionValidator(): ValidatorFn {
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

    if (date.getTime() > dateCurrent.getTime()) {
      return {
        max: true,
      };
    }

    return null;
  };
}

export function reference_paiement_cameroun(dateToCompare: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      // Champ vide, pas d'erreur de validation
      return null;
    }

    // Extraction de la date de la chaîne de caractères
    const dateStringMP = value.substring(2, 8); // Récupère les 6 chiffres représentant la date
    console.log("date code MP :" + dateStringMP);
    const yearMP = parseInt(dateStringMP.substring(0, 2), 10); // Année à partir des deux premiers chiffres (ajoute 2000 car les deux chiffres représentent l'année sur 2 chiffres)
    const monthMP = parseInt(dateStringMP.substring(2, 4), 10); // Mois (0-indexé)
    const dayMP = parseInt(dateStringMP.substring(4, 6), 10); // Jour

    const formattedMonthMP = monthMP < 10 ? '0' + monthMP : monthMP;
    const formattedDayMP = dayMP < 10 ? '0' + dayMP : dayMP;

    console.log("year "+yearMP +" -month " + monthMP +" -day " + dayMP)
    const dateMP = ""+yearMP + formattedMonthMP + formattedDayMP+"";


    // Validation de la date par rapport à la date passée en paramètre
    
    const dateTransactionControl = control.root;
    const dateToCompare2 = new Date(dateTransactionControl?.get(dateToCompare)?.value);

    const yearTR = dateToCompare2.getFullYear().toString().slice(-2); // Obtenez les deux derniers chiffres de l'année
    const monthTR = dateToCompare2.getMonth() + 1; // Les mois sont 0-indexés, alors on ajoute 1
    const dayTR = dateToCompare2.getDate();

    // Formattez le mois et le jour pour qu'ils aient toujours deux chiffres (ajoutez un zéro devant si nécessaire)
    const formattedMonth = monthTR < 10 ? '0' + monthTR : monthTR;
    const formattedDay = dayTR < 10 ? '0' + dayTR : dayTR;

    // Concaténez les parties formatées pour obtenir la chaîne de caractères finale
    const dateStringTR = yearTR + formattedMonth.toString() + formattedDay.toString();

    if (dateTransactionControl?.get(dateToCompare)?.value == "")
    {
      return { noDate: true }
    }
    else{
      console.log("*********")
      console.log("dateMP " + dateMP)
      console.log("dateTR " + dateStringTR)
      if (dateMP !== dateStringTR) {
        return { invalidDate: true };
      }
    }

    // Vérification du format de la chaîne de caractères
    const regex = /^MP(\d{6})\.(\d{4})\..*$/;
    if (!regex.test(value)) {
      return { invalidFormat: true };
    }
    

    return null; // La validation réussit
  };
}
