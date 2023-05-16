import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            hotel: {
                hotelName: '',
                hotelAddress: '',
                hotelIdTypeHotel: '',
                hotelIdCity: '',
                hotelEmail: '',
                hotelPhoneNumber: '',
                hotelRating: '',
            },
        }
    }
})