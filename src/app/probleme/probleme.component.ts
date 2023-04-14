import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProblemes: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      noTypeProbleme: ['', Validators.required], 
      notification: ['pasnotification'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
       }),
      telephone: [{value: '', disabled: true}]
      });
    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(typeProbleme => this.typeProblemes = typeProbleme,
                   error => this.errorMessage = <any>error);

          this.problemeForm.get('notification').valueChanges
            .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(notifyVia: string): void {
     const courrielGroupControl = this.problemeForm.get('courrielGroup');
     const courrielControl = this.problemeForm.get('courrielGroup.courriel');
     const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
     const telephoneControl = this.problemeForm.get('telephone');
    
     // Tous remettre à zéro (plus simple)
     courrielControl.clearValidators();
     courrielControl.reset(); // Pour enlever les messages d'erreur si le controle contenait des données invaldides
     courrielControl.disable();
    
     courrielConfirmationControl.clearValidators();
     courrielConfirmationControl.reset();
     courrielConfirmationControl.disable();
    
     telephoneControl.clearValidators();
     telephoneControl.reset(); // Pour enlever les messages d'erreur dûs à dirty, etc.. 
     telephoneControl.disable();
    
    
     if (notifyVia === 'courriel') {
     courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
     courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
     courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
     courrielControl.enable();
     courrielConfirmationControl.enable();
     } else {
     if (notifyVia === 'messageTexte') {
     telephoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);
     telephoneControl.enable();
     }
     courrielControl.updateValueAndValidity();
     courrielConfirmationControl.updateValueAndValidity();
     telephoneControl.updateValueAndValidity();
    }
  }

  save(): void {
  }

}