import { defineStore } from 'pinia'

export const useFormAddStore = defineStore('add-form', {
    state: () => {
        return {
            menu: {
                menuName: '',
                sort: 1,
                idStatusMenu: 2, 
                parentId: 3,
                sequence: '',
                description: 'Kosong',
                url: '',
                icon: {}
            }
        }
    }
})