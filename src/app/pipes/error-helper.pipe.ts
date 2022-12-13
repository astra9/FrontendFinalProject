import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorHelper'
})
export class ErrorHelperPipe implements PipeTransform {

  transform(source: ValidationErrors | null, name: any) : string[] {
      return this.formatErrorMessages(source , name)
  }

  formatErrorMessages(errors: ValidationErrors | null, name: string): string[] {
    let tmpErrors: string[] = [];
    for (let error in errors) {
        if(error==="required"){
          tmpErrors.push(`You must enter a ${name}`);
          break;
        }
        else if(error==="minlength"){
          tmpErrors.push(`${name} must be at least
              ${errors['minlength'].requiredLength}
              characters`);
          break;
        }
        else if(error==="pattern"){
          tmpErrors.push(`The ${name} contains
              illegal characters`);
          break;
        }
        else if(error==="email"){
          tmpErrors.push(`You must enter a valid email address`);
          break;
        }
    }
    return tmpErrors;
  }

}
