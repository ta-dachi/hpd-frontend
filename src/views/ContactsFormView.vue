<script setup lang="ts">
import { Auth } from "@aws-amplify/auth"
import { API } from "@aws-amplify/api"
import { onMounted, Ref, ref } from "vue"
import router from "../router"
import { useUserStore } from "@/stores/user"
import { Contact } from "@/models/models"
import { useRoute } from "vue-router"

/** Are we editting or adding? */
let mode: Ref<"Add" | "Edit" | ""> = ref("")
let loading: Ref<boolean> = ref(false)
let lockContactTable: Ref<boolean> = ref(true)

const user = useUserStore()

const users = [
  { firstName: "Frank", lastName: "Murphy", email: "frank.murphy@test.com", role: "User" },
  { firstName: "Vic", lastName: "Reynolds", email: "vic.reynolds@test.com", role: "Admin" },
  { firstName: "Gina", lastName: "Jabowski", email: "gina.jabowski@test.com", role: "Admin" },
  { firstName: "Jessi", lastName: "Glaser", email: "jessi.glaser@test.com", role: "User" },
  { firstName: "Jay", lastName: "Bilzerian", email: "jay.bilzerian@test.com", role: "User" },
]

onMounted(async () => {
  try {
    const test = (await API.get("hpdAPI", "/get_contacts", {})) as Contact[]
    // console.log(test)

    // await Auth.currentAuthenticatedUser()
  } catch (error) {
    console.error(error)
    // user.isSignedIn = false
    // router.push({path: '/login'})
    console.error("Error authenticating")
  }
})

function cancel() {
  router.push({ path: "/contacts" })
}

/**
 * Check if we are adding or editting a contact?
 */
const route = useRoute()
console.log(route.path)
if (route.path === '/contact/add') {
  mode.value = 'Add'
}


</script>

<template>
  <main class="flex h-full">
    <div class="h-full w-full">
      <div class="flex flex-row">
        <!--  -->
        <div class="flex flex-row">
          <div class="flex flex-col">
            <div class="font-bold">Name</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></div>
            <div class="font-bold mt-4">Role</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></div>
          </div>
        </div>

        <!--  -->
        <div class="ml-auto mr-40" :class="{'pointer-events-none': mode === 'Add' ? true : false}">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th class="p-2"></th>
                <th class="p-2">Name (Role)</th>
                <th class="p-2">Default Contact Number</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td class="p-2"><button class="pl-4 pr-4 rounded">Edit</button></td>
                <td class="p-2">{{ user.firstName }} {{ user.lastName }}</td>
                <td class="p-2">{{ user.email }}</td>
                <td class="p-2">{{ user.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--  -->
      <div class="flex flex-row mt-40">
        <div><button class="pl-4 pr-4 danger rounded" v-if="mode === 'Edit'">Delete</button></div>
        <div class="ml-4"><button class="pl-4 pr-4 rounded">Save</button></div>

        <div class="ml-auto"><button class="pl-4 pr-4 rounded" @click="cancel()">Cancel</button></div>
      </div>
    </div>
  </main>
</template>

<style></style>
