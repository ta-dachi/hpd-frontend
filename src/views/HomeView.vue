<script setup lang="ts">
import { Auth } from '@aws-amplify/auth';
import { API } from '@aws-amplify/api';
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue';
import router from '../router';

const user = useUserStore()

onMounted(async () => {
  try {
    const test = await API.get('hpdAPI', '/get_contacts', {})
    console.log(test)
    console.log('App.vue mounted')
    await Auth.currentAuthenticatedUser()
    user.isSignedIn = true
  } catch(error) {
    console.error(error)
    // user.isSignedIn = false
    console.error("Error authenticating")
  }
})

</script>

<template>
  <main>
    <div v-if="!user.isSignedIn">Must be logged in to use. <a class="font-bold" href="/login">Login</a></div>
    <div v-if="user.isSignedIn">You are signed in.</div>
  </main>
</template>

<style scoped>
  a:hover {
    color: green;
    font-weight: 700;
    cursor: pointer;
  }
</style>