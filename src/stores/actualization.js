import { defineStore } from "pinia"

export const useActualizationStore = defineStore('actualization', {
    state:() => {
        return {
            viewActualizationData: {}
        }
    }
})