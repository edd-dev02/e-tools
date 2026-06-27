import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'e-tools',
        children: [
            {
                path: 'salary-distributor',
                title: 'Distribuir salario',
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
