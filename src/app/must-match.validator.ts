import { FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';



// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


// // custom validator to check that two fields match
//  export function MustMatch(controlName: string, matchingControlName: string) {


//     return (formGroup: FormGroup) => {
//         const control = formGroup.controls['controlName'];
//         const matchingControl = formGroup.controls['matchingControlName'];

//         if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//             // return if another validator has already found an error on the matchingControl
//             return;
//         }

//         // set error on matchingControl if validation fails
//         if (control.value !== matchingControl.value) {
//             matchingControl.setErrors({ mustMatch: true });
//         } else {
//             matchingControl.setErrors(null);
//         }
//     }
// }



// import { FormGroup } from '@angular/forms';
// import {AbstractControl} from '@angular/forms';
// export class PasswordValidation {

//     static MatchPassword(AC: AbstractControl) {



//        let password = AC.get('password').value; // to get value in input tag
//        let confirmPassword = AC.get('cpass').value; // to get value in input tag
//         if(password != confirmPassword) {
//             console.log('false');
//             AC.get('cpass').setErrors( {MatchPassword: true} )
//         } else {
//             console.log('trueqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
//             return null
//         }
//     }
// }