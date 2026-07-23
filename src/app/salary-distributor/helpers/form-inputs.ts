import { CategoryName } from "../types/form.type";

export const formInputs: FormInput[] = [
    {
        iconContainer: 'icon-container--savings',
        icon: 'savings',
        iconClass: 'savings-icon',
        inputLabel: 'Ahorro',
        inputDescription: 'Para metas y proyectos futuros',
        inputName: 'saving'
    },
    {
        iconContainer: 'icon-container--bills',
        icon: 'bills',
        iconClass: 'bills-icon',
        inputLabel: 'Gastos',
        inputDescription: 'Gastos fijos y necesarios',
        inputName: 'bills'
    },
    {
        iconContainer: 'icon-container--leisure',
        icon: 'leisure',
        iconClass: 'leisure-icon',
        inputLabel: 'Ocio',
        inputDescription: 'Entretenimiento y gustos personales',
        inputName: 'leisure'
    },
    {
        iconContainer: 'icon-container--efund',
        icon: 'efund',
        iconClass: 'efund-icon',
        inputLabel: 'Fondo de emergencia',
        inputDescription: 'Reserva para emergencias inesperadas',
        inputName: 'eFund'
    },
]

interface FormInput {
    iconContainer: string;
    icon: string;
    iconClass: string;
    inputLabel: string;
    inputDescription: string;
    inputName: CategoryName;
}