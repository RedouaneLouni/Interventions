import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';

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
      noTypeProbleme: ['', Validators.required]
    });
    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(typeProbleme => this.typeProblemes = typeProbleme,
                   error => this.errorMessage = <any>error);
  }

  save(): void {
  }

}