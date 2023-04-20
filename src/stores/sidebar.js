import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// sidebarMenu.name
// sidebarMenu.condition

export const useSidebarStore = defineStore ('sidebar', {
    state: () => {
        return {
            sidebarMenu: {
                systemConfiguration: false,
                reference: false
            }
        }
    },
    actions: {
        increment(state) {
            // console.log('ini isi state ' + {state})
            // harus pake this buat akses state

            if(state === 'reference') {
                this.sidebarMenu.reference = !this.sidebarMenu.reference
                this.sidebarMenu.systemConfiguration = false
            } else if (state === 'systemConfiguration') {
                this.sidebarMenu.systemConfiguration = !this.sidebarMenu.systemConfiguration
                this.sidebarMenu.reference = false
            }


        },
    },
})
