import { defineStore } from 'pinia'

export const useFormEditStore = defineStore('add-form', {
    state: () => {
        return {
            approvalDelegation: {
                delegatorId: '',
                delegateId: '',
                startDate: '',
                endDate: '',
            },
        }
    }
})