import { defineStore } from 'pinia'

export const useTravelManagementFetchResult = defineStore('travel-management', {
    state:() => {
            return {
                fetchDocumentCodeResult: []
            }
    }
})