import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {GestionClientComponent} from './gestion-client/gestion-client.component';
import {GestionCommandeClientComponent} from './gestion-commande/gestion-commandeClient.component';
import {GestionProductionComponent} from './gestion-production/gestion-production.component';
import {GestionProduitsComponent} from './gestion-produits/gestion-produits.component';
import {GestionFactureComponent} from './gestion-facture/gestion-facture.component';
import {GestionStockComponent} from './gestion-stock/gestion-stock.component';
import {GestionPaiementComponent} from './gestion-paiement/gestion-paiement.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {GestionFournisseurComponent} from './gestion-fournisseur/gestion-fournisseur.component';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RippleModule} from "primeng/ripple";
import {AvatarModule} from "primeng/avatar";
import {ConfirmationService, SharedModule} from "primeng/api";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {SliderModule} from "primeng/slider";
import {FileUploadModule} from "primeng/fileupload";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MenuModule} from "primeng/menu";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbar} from "@angular/material/toolbar";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import {CodeInputModule} from 'angular-code-input';
import { ExportAsService } from 'ngx-export-as';
import { CommandeItemComponent } from './commande-item/commande-item.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        GestionClientComponent,
        GestionCommandeClientComponent,
        GestionProductionComponent,
        GestionProduitsComponent,
        GestionFactureComponent,
        GestionStockComponent,
        GestionPaiementComponent,
        DashboardComponent,
        GestionFournisseurComponent,   
        LoginComponent,
        RegisterComponent,
        ActivateAccountComponent,
        CommandeItemComponent



    ],
    imports: [
        CodeInputModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        ChartModule,
        CardModule,
        ToastModule,
        ToolbarModule,
        SplitButtonModule,
        PaginatorModule,
        TableModule,
        ConfirmDialogModule,
        RippleModule,
        ToolbarModule,
        AvatarModule,
        SharedModule,
        IconFieldModule,
        InputIconModule,
        MultiSelectModule,
        TagModule,
        SliderModule,
        FileUploadModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        MenuModule,
        MatCard,
        MatCardHeader,
        MatDivider,
        MatCardContent,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatPaginator,
        MatCardTitle,
        MatTableModule,
        MatToolbar,
    ],
    providers: [provideHttpClient(withFetch()),ExportAsService,
        provideClientHydration(), ConfirmationService, provideAnimationsAsync(),
    
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpTokenInterceptor,
          multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
