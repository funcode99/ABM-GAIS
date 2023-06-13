import { defineStore } from "pinia"

export const useMenuAccessStore = defineStore('menu-access', {
    state:() => {
        return {
            fetchResult : [],
            fetchSiteByCompanyResult: [],
            companyId: null,
        }
    }
})