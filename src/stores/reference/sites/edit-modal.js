import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            site: {
                siteIdCompany: '',
                siteName: '',
                siteCode: '',
            },
        }
    }
})