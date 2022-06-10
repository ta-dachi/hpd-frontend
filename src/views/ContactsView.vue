<script setup lang="ts">
import { Auth } from "@aws-amplify/auth"
import { API } from "@aws-amplify/api"
import { onMounted, Ref, ref } from "vue"
import router from "../router"
import { useUserStore } from "@/stores/user"
import { encodeTime } from "ulid"
import { get_contacts } from "@/api/api"
import { Contact, ContactInfo } from "@/models/models"

const user = useUserStore()
// Make variable reactive to see UI changes when the var changes
let contacts: Ref<ContactInfo[]> = ref([])
let loading: Ref<boolean> = ref(true)
onMounted(async () => {
  console.log("test")
  try {
    
    contacts.value = JSON.parse((await get_contacts()).message) as ContactInfo[]
    console.log(contacts.value)
    // await Auth.currentAuthenticatedUser()
    loading.value = false
  } catch (error) {
    
    console.error(error)
    // user.isSignedIn = false
    // router.push({path: '/login'})
    console.error("Error authenticating")
    loading.value = false
  }
})

function goEditContact() {
  router.push({ path: "/contact/edit" })
}

function goAddContact() {
  router.push({ path: "/contact/add" })
}

</script>

<template>
  <main class="flex h-full">
    <div class="m-auto">
      <!--  -->
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" style="border-right-color: black; border-top-color: black;" v-if="loading">
      </div>

      <!--  -->
      <div class="flex flex-row" v-if="!loading">
        <div class="mt-auto mb-auto"><span class="text-2xl font-bold">Emergency Contacts ({{contacts.length}})</span></div>
        <div class="ml-auto"><button class="h-8 px-4 rounded" @click="goAddContact()">Create</button></div>
      </div>

      <!--  -->
      <table class="table table-striped table-bordered" v-if="!loading">
        <thead>
          <tr>
            <th class="p-1"></th>
            <th class="p-1">Name (Role)</th>
            <th class="p-1">Default Contact Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contact, index) in contacts" :key="index">
            <td class="p-1"><button class="pl-4 pr-4 rounded" @click="goEditContact()">Edit</button></td>
            <td class="p-1">
              <div>{{ contact.first_name }} {{ contact.last_name }}</div>
              <div>{{ contact.contact_role}}</div>
            </td>
            <td class="p-1">{{ contact.contact_number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style></style>
