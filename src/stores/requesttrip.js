import { defineStore } from "pinia"

export const useRequestTripStore = defineStore('request-trip', {
    state:() => {
        return {
            employeeLoginData: [],
            isFetched: false,
            dateArrival: '',
            dateDeparture: ''
        }
    }
})