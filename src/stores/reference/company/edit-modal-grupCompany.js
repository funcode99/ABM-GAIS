import { defineStore } from 'pinia'

export const useFormEditStoreGroupCompany = defineStore('add-form', {
    state: () => {
        return {
            groupCompany: {
                companyGroupCompanyCode: '',
                companyGroupCompanyName: '',
                companyGroupCompanyLogo: '',
            },
        }
    }
})