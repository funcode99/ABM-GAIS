import { defineStore } from 'pinia'

export const useFormAddStore = defineStore('add-form', {
    state: () => {
        return {
            menu: {
                menuName: '',
                url: '',
                sequence: '',
                sequenceCode: '',
                icon: {},
                sort: 1,
                idStatusMenu: 0, 
                parentId: 3,
                companyId: null
            },
            user: {
                username: '',
                fullname: '',
                email: '',
                password: '',
                isEmployee: 0,
                roleId: 0,
                approvalAuthId: 0,
                companyId: 0,
                siteId: 0,
                idStatusMenu: 0
            },
            role: {
                roleName : '',
                roleCode: ''
            },
            approval: {
                matrixName: '',
                companyId: 1,
                menuId: 1,
                codeDocumentId: 1,
                arrayDetail: null,
                minCA: 0,
                maxCA: 0
            },
            sequence: {
                sequenceName: '',
                sequenceSize: 1,
                recycle: '',
                menuId: 1,
                nextValue: 1,
                prefix: '',
                suffix: '',
                company: 0
            },
            menuAccess: {
                roleId: '',
                write: '',
                read: ''
            }
        }
    }
})