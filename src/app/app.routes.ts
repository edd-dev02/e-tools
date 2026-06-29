import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'e-tools',
        children: [
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
                redirectTo: 'salary-distributor',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'salary-distributor',
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/e-tools/salary-distributor'
    }
];
