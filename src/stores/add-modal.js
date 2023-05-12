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
            },
            user: {
                username: '',
                email: '',
                password: '',
                isEmployee: 0,
                roleId: 0,
                approvalAuthId: 0,
                companyId: 0,
                siteId: 0
            }
        }
    }
})