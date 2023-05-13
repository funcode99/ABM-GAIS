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
            },
            role: {
                roleName : ''
            },
            approval: {
                matrixName: '',
                companyId: 1,
                menuId: 1,
                codeDocumentId: 1
            },
            sequence: {
                sequenceName: '',
                recycle: '',
                menuId: 1,
                nextValue: 1,
                sequenceSize: 1,
                prefix: 1,
                suffix: 1
            }
        }
    }
})