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
                this.sidebarMenu.reference ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

                this.sidebarMenu.systemConfiguration = false
                this.sidebarMenu.travelManagementSystem = false

            } else if (state === 'systemConfiguration') {

                this.sidebarMenu.systemConfiguration = !this.sidebarMenu.systemConfiguration
                this.sidebarMenu.systemConfiguration ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

                this.sidebarMenu.reference = false
                this.sidebarMenu.travelManagementSystem = false
            } else if (state === 'travelManagementSystem') {

                this.sidebarMenu.travelManagementSystem = !this.sidebarMenu.travelManagementSystem
                this.sidebarMenu.travelManagementSystem ? sessionStorage.setItem('isOpen', state) : sessionStorage.setItem('isOpen', '')

                this.sidebarMenu.systemConfiguration = false
                this.sidebarMenu.reference = false
            }

        },
        changeWide() {
            this.isWide = !this.isWide
        },
        setSidebarRefresh(state) {
            // ke 3 state sudah false

            if(this.sidebarMenu.reference === false && this.sidebarMenu.systemConfiguration === false && this.sidebarMenu.travelManagementSystem === false) {
                if(state === 'reference') {
                    this.sidebarMenu.reference = true
                } else if (state === 'systemConfiguration') {
                    console.log('masuk ke sini')
                    this.sidebarMenu.systemConfiguration = true
                } else if (state === 'travelManagementSystem') {
                    this.sidebarMenu.travelManagementSystem = true
                }
            }

        }
    },
})
