import { defineStore } from 'pinia'

export const useReferenceFetchResult = defineStore('reference', {
    state:() => {
            return {
                fetchCompanyResult: [],
                fetchSiteResult: [],
                fetchEmployeeResult: [],
                fetchIndividualEmployeeResult: []
            }
    }
})