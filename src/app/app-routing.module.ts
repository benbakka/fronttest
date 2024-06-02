import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { GestionClientComponent } from './gestion-client/gestion-client.component';
import { GestionProductionComponent } from './gestion-production/gestion-production.component';
import { GestionProduitsComponent } from './gestion-produits/gestion-produits.component';
import { GestionFactureComponent } from './gestion-facture/gestion-facture.component';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';
import { GestionPaiementComponent } from './gestion-paiement/gestion-paiement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionFournisseurComponent } from './gestion-fournisseur/gestion-fournisseur.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { authGuard } from './services/guard/auth.guard'; // Corrected the import statement
import { CommandeItemComponent } from './commande-item/commande-item.component';
import { GestionCommandeClientComponent } from './gestion-commande/gestion-commandeClient.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: 'clients', component: GestionClientComponent, canActivate: [authGuard] },
      { path: 'commandes', component: GestionCommandeClientComponent, canActivate: [authGuard] },
      { path: 'production', component: GestionProductionComponent, canActivate: [authGuard] },
      { path: 'produits', component: GestionProduitsComponent, canActivate: [authGuard] },
      { path: 'factures', component: GestionFactureComponent, canActivate: [authGuard] },
      { path: 'stock', component: GestionStockComponent, canActivate: [authGuard] },
      { path: 'paiements', component: GestionPaiementComponent, canActivate: [authGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'fournisseurs', component: GestionFournisseurComponent, canActivate: [authGuard] },
      { path: 'commandeItem', component: CommandeItemComponent, canActivate: [authGuard] }
    ]
  },
  // { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
