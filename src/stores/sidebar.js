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
                this.sidebarMenu.systemConfiguration = false
                this.sidebarMenu.travelManagementSystem = false
            } else if (state === 'systemConfiguration') {
                this.sidebarMenu.systemConfiguration = !this.sidebarMenu.systemConfiguration
                this.sidebarMenu.reference = false
                this.sidebarMenu.travelManagementSystem = false
            } else if (state === 'travelManagementSystem') {
                this.sidebarMenu.travelManagementSystem = !this.sidebarMenu.travelManagementSystem
                this.sidebarMenu.systemConfiguration = false
                this.sidebarMenu.reference = false
            }

        },
        changeWide() {
            this.isWide = !this.isWide
        }
    },
})
