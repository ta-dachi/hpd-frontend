<script setup lang="ts">
import { Auth } from "@aws-amplify/auth"
import { API } from "@aws-amplify/api"
import { onMounted, Ref, ref } from "vue"
import router from "../router"
import { useUserStore } from "@/stores/user"
import { Contact } from "@/models/models"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity"
import { add_contact } from "@/api/api"

// Add Contact Form
let addContactForm: Ref<{
  first_name: {error_message: string, value: string, error: boolean},
  last_name: {error_message: string, value: string, error: boolean},
  email: {error_message: string, value: string, error: boolean},
  role: {error_message: string, value: string, error: boolean},
  contact_number_default: {error_message: string, value: string, error: boolean},
  contact_number_type_default: {error_message: string, value: string, error: boolean},
}> = ref({
  first_name: {error_message: "First Name is required.", value: "", error: false},
  last_name: {error_message: "Last Name is required.", value: "", error: false},
  email: {error_message: "Email is required.", value: "", error: false},
  role: {error_message: "Role is required.", value: "", error: false},
  contact_number_default: {error_message: "Contact Number (Default) is required.", value: "", error: false},
  contact_number_type_default: {error_message: "Contact Number Type (Default) is required.", value: "", error: false},
})

const addContact = async () => {
  let isValid = true
  addContactForm.value.first_name.error = addContactForm.value.first_name.value === "" ? true : false
  addContactForm.value.last_name.error = addContactForm.value.last_name.value === "" ? true : false
  addContactForm.value.email.error = addContactForm.value.email.value === "" ? true : false
  addContactForm.value.role.error = addContactForm.value.role.value === "" ? true : false
  addContactForm.value.contact_number_default.error = addContactForm.value.contact_number_default.value === "" ? true : false
  addContactForm.value.contact_number_type_default.error = addContactForm.value.contact_number_type_default.value === "" ? true : false

  // Check if are invalid
  Object.values(addContactForm.value).forEach(value => {
    if (value.error === true) {
      // console.log(value.error_message)
      isValid = false
    }
  })
  console.log(isValid)
  if (isValid) {
    try {
      // TODO Replace created_by with actual creator
      // TODO Add Loading animation
      const response = JSON.parse((await add_contact(addContactForm.value.first_name.value, addContactForm.value.last_name.value, addContactForm.value.role.value, "", addContactForm.value.email.value)).message) as {id: number}[]
      const id = response[0].id
     console.log(id)
      router.push({ path: `/contact/edit`, query: {id: `${id}`} })
    } catch (error) {
      router.push({ path: `contacts`})
      console.error(error)
    }
  }
}

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
    // const test = (await API.get("hpdAPI", "/get_contacts", {})) as Contact[]
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
if (route.path === '/contact/edit') {
  mode.value = 'Edit'
}

const formActionReducer = (mode: "Add" | "Edit" | "") => {
  if (mode === 'Add') {
    addContact()
  }
  if (mode === 'Edit') {
    addContact()
  }
}

</script>

<template>
  <main class="flex h-full">
    <div class="h-full w-full">
      <div class="flex flex-row">
        <!--  -->
        <div class="flex flex-row">
          <div class="flex flex-col">
            <div class="font-bold">First Name</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="addContactForm.first_name.value"/></div>
            <div class="font-bold">Last Name</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="addContactForm.last_name.value"/></div>
            <div class="font-bold">Email</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="addContactForm.email.value"/></div>
            <div class="font-bold">Role</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="addContactForm.role.value"/></div>
            <div class="font-bold">Contact Number (Default)</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="addContactForm.contact_number_default.value"/></div>
            <div class="font-bold">Contact Number Type (Default)</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="addContactForm.contact_number_type_default.value"/></div>
            <!-- Errors -->
            <div>
              <div v-for="(value, index) in Object.values(addContactForm)" :key="index"> 
                {{value.error ? value.error_message : ""}}
              </div>
            </div>
          </div>
        </div>
        <!-- DEBUG -->
        <!-- <div>
          <pre>
            {{JSON.stringify(addContactForm, 0, 1)}}
          </pre>
        </div> -->
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
        <div class="ml-4"><button class="pl-4 pr-4 rounded" @click="formActionReducer(mode)">Save</button></div>

        <div class="ml-auto"><button class="pl-4 pr-4 rounded" @click="cancel()">Cancel</button></div>
      </div>
    </div>
  </main>
</template>

<style></style>
