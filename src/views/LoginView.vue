<script setup lang="ts">
  import { Authenticator } from "@aws-amplify/ui-vue"
  import "@aws-amplify/ui-vue/styles.css"
  import { useCounterStore } from '@/stores/counter'
  import { useUserStore } from '@/stores/user'
  import { Auth } from 'aws-amplify'
import router from "../router"

  const counter = useCounterStore()
  counter.count++
  // with autocompletion ✨
  counter.$patch({ count: counter.count })
  // or using an action instead
  counter.increment()

  console.log(counter.$state.count)

  const user = useUserStore()
  console.log(user)
  const routeToHome = () => {
    router.push({path: '/'})
  }

</script>

<template>
  <main class="flex h-full">
    <authenticator class="m-auto">
      <template>
        <!-- <pre>
          {{ JSON.stringify(user, 0, 1) }}
        </pre> -->
        <!-- If we get here, we can login! -->
        {{routeToHome()}}
      </template>
    </authenticator>
  </main>
</template>

<style></style>
