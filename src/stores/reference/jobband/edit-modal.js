import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            jobBand: {
                jobBandIdCompany: '',
                jobBandName: '',
                jobBandHotelFare: '',
                jobBandMealrate: '',
                jobBandIdFlight: '',
                arrayDetail: [],
            },
        }
    }
})