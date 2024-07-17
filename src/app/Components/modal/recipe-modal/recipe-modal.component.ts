import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal/modal.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css'],
})
export class RecipeModalComponent {
  recipeData: any = [];
  id: any;
  recipeName: any;
  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getIndividualRecipe(this.id);
  }

  getIndividualRecipe(id: any) {
    this.auth.getEachRecipes(id).subscribe(
      (response: any) => {
        this.recipeData = response;
        this.recipeName = response.name;
      },
      (error: any) => {}
    );
  }
}
