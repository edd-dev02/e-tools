import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'e-tools',
        children: [
            {
                path: 'home',
                title: 'Inicio',
                data: {
                    icon: 'home',
                    classIcon: 'home-icon',
                    ariaLabelIcon: 'Icono de opción página inicial'
                },
                loadComponent: () => import('./home/pages/home-page/home-page.component').then(c => c.default)
            },
            {
                path: 'salary-distributor',
                title: 'Distribuir salario',
                data: {
                    icon: 'money_bag',
                    classIcon: 'money-icon',
                    ariaLabelIcon: 'Icono de opcion módulo distribuidor de salario'
                },
                loadComponent: () => import('./salary-distributor/pages/salary-distributor-page/salary-distributor-page.component').then(c => c.default)

            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'home',
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/e-tools/home'
    }
];
