<script setup>
    import { ref } from 'vue'
    import headerBarLinks from '@/components/msal/header-bar-links.vue'

    let account = ref(undefined)
    let containers = ref([])

    const login = (account) => {
        account.value = account
    }

    const logout = (account) => {
        // console.log(account)
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

</template>