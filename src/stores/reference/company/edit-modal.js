import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            company: {
                companyName: '',
                companyCode: '',
                companyGroup: '',
                companyShortName: '',
                companyIdVendor: '',
                companyLogo: '',
                companyCodeErp: '',
            },
        }
    }
})