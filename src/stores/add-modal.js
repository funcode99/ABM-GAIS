import { defineStore } from 'pinia'

export const useFormAddStore = defineStore('add-form', {
    state: () => {
        return {
            menu: {
                menuName: '',
                url: '',
                sequence: '',
                description: 'Kosong',
                icon: {},
                sort: 1,
                idStatusMenu: 2, 
                parentId: 3,
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
                nextValue: 1,
                prefix: '',
                suffix: '',
                menuId: 1,
                sequenceSize: 1,
            }
        }
    }
})