import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "notas",
        pathMatch: 'full'
    },
    {
        path: "notas",
        loadComponent: () => import("./components/notas/notas.component").then((m) => m.NotasComponent)
    },

];
