<script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router"
  import { Auth } from "@aws-amplify/auth"
  import { onMounted, onUpdated } from "vue"
  import { useUserStore } from "@/stores/user"
  import router from "./router"

  const user = useUserStore()

onMounted(async () => {
  try {
    console.log('App.vue mounted')
    await Auth.currentAuthenticatedUser()
    user.isSignedIn = true
  } catch(error) {
    // user.isSignedIn = false
    console.error("Error authenticating")
  }
})
onUpdated(async () => {
  try {
    console.log('App.vue updated')
    await Auth.currentAuthenticatedUser()
    user.isSignedIn = true
  } catch(error) {
    // user.isSignedIn = false
    console.error("Error authenticating")
  }
})
/** Invalidate all tokens and sign off all devices */
const signOut = async () => {
  try {
    await Auth.signOut({ global: true })
    user.isSignedIn = false
    router.push({path: '/login'})
  } catch (error) {
    console.error(error)
  }
} 

</script>

<template>
  <main id="app" class="flex flex-col w-screen h-screen">
    <div class="flex flex-row pt-4 pb-4 grow-0">
      <div>
        <h2 class="text-3xl font-bold underline">hpd</h2>
      </div>
      <div class="flex flex-row w-full ml-auto">
        <div class="flex pl-4">
          <a class="m-auto" href="/">Home</a>
        </div>
        <div class="flex pl-4">
          <a class="m-auto" href="/about">About</a>
        </div>

        <div class="flex pl-4 ml-auto" v-if="!user.isSignedIn">
          <a class="m-auto" href="/login">Login</a>
        </div>

        <div class="flex pl-4 ml-auto" v-if="user.isSignedIn">
          <a class="m-auto cursor-pointer" @click="async () => await signOut()">Sign Off</a>
        </div>
      </div>
    </div>

    <div class="grow">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

/* @media (hover: hover) {
  a:hover {
    color: lightgreen;
  }
} */
</style>

