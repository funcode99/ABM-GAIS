import { defineStore } from 'pinia'

export const useSysconfigFetchResult = defineStore('sysconfig', {
    state:() => {
            return {
                fetchRoleResult: [],
                fetchMenuResult: [],
                fetchMenuStatusResult: [],
                fetchApproverAuthoritiesResult: []
            }
    }
})