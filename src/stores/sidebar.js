import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore ('sidebar', {
    state: () => {
        return {
            sidebarMenu: [
                { systemConfiguration: false },
                { reference: false }
            ]
        }
    },
    actions: {
        increment(state) {
            
            // console.log('ini isi state ' + {state})
            // harus pake this buat akses state
            // this.reference = !this.reference
            // const keys = Object.keys(this.sidebarMenu)
            
            // isinya array yang berisi nama keys dari objek sidebarMenu
            // console.log(keys)
            // const result = keys.forEach((key, index) => {
                // console.log(`${key}: ${this.sidebarMenu[key]} `)
            // })

            // console.log(result)

            this.sidebarMenu.forEach((key, index) => {
                // isinya objek
                console.log(key)
                // console.log(index)
            })

        },
    },
})
