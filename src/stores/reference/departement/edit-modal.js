import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            departement: {
                departementIdCompany: '',
                departementCode: '',
                departementName: '',
                departementCostCenter: '',
                departementProfitCenter: '',
                departementGlAccount: '',
                departementStatus: '',
                departementDivision: '',
                departementHead: '',
            },
        }
    }
})