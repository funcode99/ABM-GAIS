import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            brand: {
                brandName: '',
                brandIdCompany: '',
                brandIdSite: '',
            },
        }
    }
})