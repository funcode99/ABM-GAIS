<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { BlobServiceClient } from '@azure/storage-blob'
    import { PublicClientApplication } from '@azure/msal-browser'
    import { useMSALStore } from '@/stores/msal'
    import headerBarLinks from '@/components/msal/header-bar-links.vue'

    let account = ref(undefined)
    let containers = ref([])
    let msalStore = useMSALStore()
    // const storageAccountName = 'cmatskasbackup'

    const login = (account) => {
        // console.log(account)
        account.value = account
        // getAzureStorageData()
    }

    const logout = (account) => {
        // console.log(account)
    }

    const getAzureStorageData = async () => {
        
        if(msalStore.accessToken === '') {
            // await getAccessToken()
        }
        // let tokenCredential = new customTokenCredential(msalStore.accessToken)
        // const blobClient = new BlobServiceClient(
        //     `https://${storageAccountName}.blob.core.windows.net`,
        //     tokenCredential
        // )

        // let i = 1
        // const iter = blobClient.listContainers()
        // let containerItem = await iter.next()
        // while (!containerItem.done) {
        //     console.log(`Container ${i++}: ${containerItem.value.name}`)
        //     containers.value.push({
        //         id: containerItem.value.properties.etag,
        //         name: containerItem.value.name
        //     })
        //     containerItem = await iter.next()
        // }

    }

    let isi = ref()

    const getAccessToken = async () => {
        let request = {
            scopes: ['https://storage.azure.com/user_impersonation']
        }
        const msalInstance = new PublicClientApplication(
            msalStore.msalConfig
        )

        try {
            let tokenResponse = await msalInstance.acquireTokenSilent(request)
            msalStore.accessToken = tokenResponse.accessToken
        } catch (error) {
            console.error( 'Silent token acquisition failed. Using interactive mode' );
            let tokenResponse = await msalInstance.acquireTokenPopup(request);
            console.log(`Access token acquired via interactive auth ${tokenResponse.accessToken}`)
            msalStore.setAccessToken(tokenResponse.accessToken)
        }

    }


</script>

<template>

    <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Welcome to the Azure AD + Storage app with Vue.js</h2>
    </div>
    <div v-if="account">
      <div class="level">
        <div class="level-item title">
          You are logged in as {{ account.name }}
        </div>
      </div>
      <div class="level">
        <div class="level-item">
          <ul>
            <li v-for="container in containers" :key="container.id">
              {{ container.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>You need to authenticate to access your SQL data</div>
    </div>

    <headerBarLinks
        @login="login"
        @logout="logout"
    />

    <!-- {{ msalStore }} -->

</template>