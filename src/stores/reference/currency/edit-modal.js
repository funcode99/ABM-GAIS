import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            currency: {
                currencyName: '',
                currencySymbol: '',
                currencyCode: '',
            },
        }
    }
})