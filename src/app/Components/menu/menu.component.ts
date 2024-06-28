import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  hideOnLogin: boolean = false;
  foodItems: any = [];
  recipeData: any = [];

  ngOnInit(): void {
    this.getRecipe();
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideOnLogin = event.url !== '/login';
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }

  @ViewChild('dialogContentTemplate') dialogContentTemplate!: TemplateRef<any>;
  openDialog(): void {
    this.dialog.open(this.dialogContentTemplate, {
      width: '50%',
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  getRecipe() {
    this.auth.getRecipes().subscribe(
      (response: any) => {
        this.foodItems = response;
      },
      (error: any) => {}
    );
  }

  getIndividualRecipe(id: any) {
    this.auth.getEachRecipes(id).subscribe(
      (response: any) => {
        this.recipeData = response;
        this.openDialog();
      },
      (error: any) => {}
    );
  }
}
