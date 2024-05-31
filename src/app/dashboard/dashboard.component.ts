import {Component, OnInit} from '@angular/core';
import {CommandeClient} from "../beans/commandeClient";
import {GestionClientService} from "../service/gestion-client.service";
import {MenuItem} from "primeng/api";


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {
    data: any;
    options: any;
    lineChartData: any;
    lineChartOptions: any;
    data2: any;
    options2: any;
    basicData:any;
    basicOptions:any;

    items!: MenuItem[];
    constructor(private gestionClientService: GestionClientService ) { }

    get commandesClient(): CommandeClient[] {
        return this._commandesClient;
    }

    set commandesClient(value: CommandeClient[]) {
        this._commandesClient = value;
    }

    data3: any;

    options3: any;
    private _commandesClient!: CommandeClient[];


    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const documentStyle2 = getComputedStyle(document.documentElement);
        const textColor2 = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const documentStyle3 = getComputedStyle(document.documentElement);
        const textColor3 = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['En stock', 'Hors stock', 'En production', 'En commande', 'En transit', 'Retourné'],
            datasets: [
                {
                    data: [540, 325, 702, 45, 67, 89],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--red-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    }
                }
            }
        };


        this.lineChartData = {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Novembre', 'Décembre'],
            datasets: [
                {
                    label: 'Expeditions',
                    data: [65, 59, 80, 81, 56, 55, 40, 34, 56, 78, 12, 90],
                    fill: false,
                    borderColor: documentStyle2.getPropertyValue('--blue-500'),
                    tension: 0.2
                },
                {
                    label: 'Receptions',
                    data: [28, 48, 40, 19, 86, 27, 90, 67, 78, 78, 10, 89],
                    fill: false,
                    borderColor: documentStyle2.getPropertyValue('--pink-500'),
                    tension: 0.2
                }
            ]
        };

        this.lineChartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.9,
            plugins: {
                legend: {
                    labels: {
                        color: textColor2
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.data2 = {
            labels: ['Validée', 'Livrée', 'Annulée', 'En Attente', 'Retournée'],
            datasets: [
                {
                    data: [20, 50, 100, 55, 60],
                    backgroundColor: [documentStyle.getPropertyValue('--purple-800'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-600'), documentStyle.getPropertyValue('--teal-500'), documentStyle.getPropertyValue('--bluegray-900')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options2 = {
            cutout: '50%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
        this.data3 = {
            labels: ['En Attente', 'Réceptionné', 'Annulé', 'Retourné', 'Facturé'],
            datasets: [
                {
                    data: [300, 50, 100, 45, 67],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--green-orange')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options3 = {
            cutout: '50%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
        this.basicData = {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Novembre', 'Décembre'],

            datasets: [
                {
                    label: 'Clients',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40,67,78,67,9,78]
                },
                {
                    label: 'Fournisseurs',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90,67,78,67,9,78]
                }
            ]
        };

        this.basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        };
    }


}
