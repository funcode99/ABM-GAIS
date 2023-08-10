import { defineStore } from 'pinia'

export const useMSALStore = defineStore('msal', {
    state: () => {
        return {
            msalConfig: {
                auth: {
                    clientId: '949ac9dc-c596-43e9-a8fb-8e6ac160095c',
                    authority: 'https://login.microsoftonline.com/83b0f7db-ea2a-4580-9ca9-5435ef0cae12'
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