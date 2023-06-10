import { defineStore } from 'pinia'

export const useSysconfigFetchResult = defineStore('sysconfig', {
    state:() => {
            return {
                fetchMenuResult: [],
                fetchMenuStatusResult: [],
                fetchApproverAuthoritiesResult: []
            }
    }
})