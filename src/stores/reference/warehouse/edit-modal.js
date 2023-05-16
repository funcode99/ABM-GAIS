import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            warehouse: {
                warehouseName: '',
                warehouseIdCompany: '',
                warehouseIdSite: '',
            },
        }
    }
})