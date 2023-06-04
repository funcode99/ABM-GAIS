import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            reimbursement: {
                reimbursementType: '',
                reimbursementParent: '',
                reimbursementIdJobBand: '',
            },
        }
    }
})