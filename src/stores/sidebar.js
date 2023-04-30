import { defineStore } from 'pinia'

// sidebarMenu.name
// sidebarMenu.condition

export const useSidebarStore = defineStore ('sidebar', {
    state: () => {
        return {
            sidebarMenu: {
                travelManagementSystem: false,
                systemConfiguration: false,
                reference: false,
            },
            isWide: true
        }
    },
    actions: {
        increment(state) {

            if(state === 'reference') {
                this.sidebarMenu.reference = !this.sidebarMenu.reference

                this.sidebarMenu.reference === true ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

                this.sidebarMenu.systemConfiguration = false
                this.sidebarMenu.travelManagementSystem = false
            } else if (state === 'systemConfiguration') {
                this.sidebarMenu.systemConfiguration = !this.sidebarMenu.systemConfiguration

                this.sidebarMenu.systemConfiguration === true ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

                this.sidebarMenu.reference = false
                this.sidebarMenu.travelManagementSystem = false
            } else if (state === 'travelManagementSystem') {
                this.sidebarMenu.travelManagementSystem = !this.sidebarMenu.travelManagementSystem

                this.sidebarMenu.travelManagementSystem === true ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

                this.sidebarMenu.systemConfiguration = false
                this.sidebarMenu.reference = false
            }

        },
        changeWide() {
            this.isWide = !this.isWide
        }
    },
})
