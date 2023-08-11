<script setup>
    import { PublicClientApplication } from '@azure/msal-browser'
    import { useMSALStore } from '@/stores/msal'
    import { onMounted, ref } from 'vue'

    let msalStore = useMSALStore()
    let account = ref(undefined)

    let emits = defineEmits(['login', 'logout'])

    msalStore.msalInstance = new PublicClientApplication(
        msalStore.msalConfig
    )

    onMounted(() => {
        const accounts = msalStore.msalInstance.getAllAccounts()
        if (accounts.length == 0) {
            return
        }
        account.value = accounts[0]
        emits('login', account.value)
    })

    const SignIn = async () => {
        await msalStore.msalInstance.loginPopup({}).then(() => {
            const myAccounts = msalStore.msalInstance.getAllAccounts()
            account.value = myAccounts[0]
            emits('login', account.value)
        })
        .catch(error => {
            console.error(`error during authentication: ${error}`)
        })
    }

    const SignOut = async () => {
        await msalStore.msalInstance.logout({}).then(() => {
            emits('logout', 'logging out')
        })
        .catch(error => {
            console.error(error)
        })
    }

    let accessTokenValue = ref()

    Object.keys(localStorage).map((key) => {
         if(localStorage.getItem(key).includes('AccessToken')) {
             accessTokenValue.value = localStorage.getItem(key)
             accessTokenValue.value = JSON.parse(accessTokenValue.value)
         }
    })

</script>

<template>
    <div class="navbar-menu">
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a
                        v-if="!account"
                        @click="SignIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        login
                    </a>
                    <a v-else @click="SignOut" target="_blank" rel="noopener noreferrer">
                        logout
                    </a>
                    <div v-if="account">{{ account.name }} {{ account.username }} {{ accessTokenValue }}</div>
                </div>
            </div>
        </div>
    </div>
</template>