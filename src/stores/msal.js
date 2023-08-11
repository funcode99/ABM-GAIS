import { defineStore } from 'pinia'

export const useMSALStore = defineStore('msal', {
    state: () => {
        return {
            msalConfig: {
                auth: {
                    clientId: import.meta.env.VITE_APP_CLIENT_ID,
                    authority: import.meta.env.VITE_APP_TENANT_ID
                },
                cache: {
                    cacheLocation: 'localStorage'
                },
            },
            accessToken: '',
            msalInstance: {},
            emitter: {}
        }
    },
    actions: {
        setAccessToken(state, token) {
            state.accessToken = token
        }
    }
})