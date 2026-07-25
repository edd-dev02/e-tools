export interface EmitForm {
    isValid: boolean;
    formValues: PercentagesForm;
}

export interface PercentagesForm {
    saving: number;
    bills: number;
    leisure: number;
    eFund: number;
}