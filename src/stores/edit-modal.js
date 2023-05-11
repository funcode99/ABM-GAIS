import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            menu: {
                menuName: '',
                sort: 1,
                idStatusMenu: 1, 
                parentId: 1,
                sequence: '',
                description: 'Kosong',
                url: '',
                icon: {}
            }
        }
    }
})