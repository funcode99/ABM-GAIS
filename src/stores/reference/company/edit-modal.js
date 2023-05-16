import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            company: {
                companyCode: '',
                companyName: '',
                companyParentCompany: '',
                companyLogo: '',
                companyVendor: '',
            },
        }
    }
})