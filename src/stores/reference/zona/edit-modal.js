import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            zona: {
                zonaName: '',
                zonaIdCity: '',
            },
        }
    }
})