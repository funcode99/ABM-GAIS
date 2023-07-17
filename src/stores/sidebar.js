import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => {
        return {
            // sidebarMenu: {
            //     travelManagementSystem: false,
            //     systemConfiguration: false,
            //     reference: false,
            //     approval: false,
            //     facilityServiceSystem: false,
            // },
            sidebarMenu: '',
            isWide: true,
            scrollValue: 0
        }
    },
    actions: {
        increment(state) {

            if(this.sidebarMenu === state) {
                this.sidebarMenu = ''
            } else {
                this.sidebarMenu = state
            }

            // if (state === 'reference') {

            //     this.sidebarMenu.reference = !this.sidebarMenu.reference
            //     this.sidebarMenu.reference ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

            //     this.sidebarMenu.systemConfiguration = false
            //     this.sidebarMenu.travelManagementSystem = false
            //     this.sidebarMenu.approval = false
            //     this.sidebarMenu.facilityServiceSystem = false

            // } else if (state === 'systemConfiguration') {

            //     this.sidebarMenu.systemConfiguration = !this.sidebarMenu.systemConfiguration
            //     this.sidebarMenu.systemConfiguration ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

            //     this.sidebarMenu.reference = false
            //     this.sidebarMenu.travelManagementSystem = false
            //     this.sidebarMenu.approval = false
            //     this.sidebarMenu.facilityServiceSystem = false

            // } else if (state === 'travelManagementSystem') {

            //     this.sidebarMenu.travelManagementSystem = !this.sidebarMenu.travelManagementSystem
            //     this.sidebarMenu.travelManagementSystem ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

            //     this.sidebarMenu.systemConfiguration = false
            //     this.sidebarMenu.reference = false
            //     this.sidebarMenu.approval = false
            //     this.sidebarMenu.facilityServiceSystem = false

            // } else if (state === 'approval') {

            //     this.sidebarMenu.approval = !this.sidebarMenu.approval
            //     this.sidebarMenu.approval ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

            //     this.sidebarMenu.reference = false
            //     this.sidebarMenu.systemConfiguration = false
            //     this.sidebarMenu.travelManagementSystem = false
            //     this.sidebarMenu.facilityServiceSystem = false

            // } else if (state === 'facilityServiceSystem') {

            //     this.sidebarMenu.facilityServiceSystem = !this.sidebarMenu.facilityServiceSystem
            //     this.sidebarMenu.facilityServiceSystem ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

            //     this.sidebarMenu.reference = false
            //     this.sidebarMenu.systemConfiguration = false
            //     this.sidebarMenu.travelManagementSystem = false
            //     this.sidebarMenu.approval = false

            // }

        },
        changeWide() {
            this.isWide = !this.isWide
        },
        setSidebarRefresh(state) {
            // ke 3 state sudah false

            // if (this.sidebarMenu.reference === false && this.sidebarMenu.systemConfiguration === false && this.sidebarMenu.travelManagementSystem === false) {
            //     if (state === 'reference') {
            //         this.sidebarMenu.reference = true
            //     } else if (state === 'systemConfiguration') {
            //         this.sidebarMenu.systemConfiguration = true
            //     } else if (state === 'travelManagementSystem') {
            //         this.sidebarMenu.travelManagementSystem = true
            //     } else if (state === 'approval') {
            //         this.sidebarMenu.approval = true
            //     } else if (state === 'facilityServiceSystem') {
            //         this.sidebarMenu.facilityServiceSystem = true
            //     }
            // }

        }
    },
})
