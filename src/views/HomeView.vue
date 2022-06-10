<script setup lang="ts">
import { Auth } from '@aws-amplify/auth';
import { API } from '@aws-amplify/api';
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue';
import router from '../router';

const user = useUserStore()

onMounted(async () => {
  try {
    // const test = await API.get('hpdAPI', '/get_contacts', {})
    // console.log(test)
    console.log('App.vue mounted')
    await Auth.currentAuthenticatedUser()
    user.isSignedIn = true
  } catch(error) {
    console.error(error)
    // user.isSignedIn = false
    console.error("Error authenticating")
  }
})


// const t1 = process.env.VUE_APP_REGION
// const t2 = process.env.VUE_APP_USER_POOL_ID
// const t3 = process.env.VUE_APP_CLIENT_ID

</script>

<template>
  <main>
    <div v-if="!user.isSignedIn">Must be logged in to use. <a class="font-bold" href="/login">Login</a></div>
    <div v-if="user.isSignedIn">You are signed in.</div>

    <div v-if="user.isSignedIn">Check your <a class="font-bold" href="/contacts">Contacts</a></div>

    <!-- Debug Amplify .env -->
    <!-- <div>{{t1}}</div>
    <div>{{t2}}</div>
    <div>{{t3}}</div> -->
  </main>
</template>

<style scoped>

</style>