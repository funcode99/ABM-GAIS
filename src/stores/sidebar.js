import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => {
        return {
            sidebarMenu: '',
            isWide: true,
            scrollValue: 0,
            menuData: '',
            writeMenu: [],
            readMenu: []
        }
    },
    actions: {
        increment(state) {

            if(this.sidebarMenu === state) {
                this.sidebarMenu = ''
            } else {
                this.sidebarMenu = state
            }

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
