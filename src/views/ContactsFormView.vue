<script setup lang="ts">
import { Auth } from "@aws-amplify/auth"
import { API } from "@aws-amplify/api"
import { onMounted, onUpdated, Ref, ref } from "vue"
import router from "../router"
import { useUserStore } from "@/stores/user"
import { Contact, ContactInfo } from "@/models/models"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity"
import { add_contact, add_contact_info, get_contact_by_id, get_contact_info, remove_contact, remove_contact_info, update_contact, update_contact_info } from "@/api/api"

interface ContactInfo_w_UI extends ContactInfo {
  show: boolean
  editting: boolean
}

let id: Ref<number | null> = ref(null)
let loadingContactForm: Ref<boolean> = ref(true)

// Add/Edit/Remove Contact Form
let contactForm: Ref<{
  first_name: { error_message: string; value: string; error: boolean }
  last_name: { error_message: string; value: string; error: boolean }
  email: { error_message: string; value: string; error: boolean }
  role: { error_message: string; value: string; error: boolean }
  contact_number_default: { error_message: string; value: string; error: boolean }
  contact_number_type_default: { error_message: string; value: string; error: boolean }
}> = ref({
  first_name: { error_message: "First Name is required.", value: "", error: false },
  last_name: { error_message: "Last Name is required.", value: "", error: false },
  email: { error_message: "Email is required.", value: "", error: false },
  role: { error_message: "Role is required.", value: "", error: false },
  contact_number_default: { error_message: "Contact Number (Default) is required.", value: "", error: false },
  contact_number_type_default: { error_message: "Contact Number Type (Default) is required.", value: "", error: false },
})

const addContact = async () => {
  let isValid = true
  contactForm.value.first_name.error = contactForm.value.first_name.value === "" ? true : false
  contactForm.value.last_name.error = contactForm.value.last_name.value === "" ? true : false
  contactForm.value.email.error = contactForm.value.email.value === "" ? true : false
  contactForm.value.role.error = contactForm.value.role.value === "" ? true : false
  contactForm.value.contact_number_default.error = contactForm.value.contact_number_default.value === "" ? true : false
  contactForm.value.contact_number_type_default.error = contactForm.value.contact_number_type_default.value === "" ? true : false

  // Check if are invalid
  Object.values(contactForm.value).forEach((value) => {
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
      const response = JSON.parse((await add_contact(contactForm.value.first_name.value, contactForm.value.last_name.value, contactForm.value.role.value, "", contactForm.value.email.value, contactForm.value.contact_number_default.value, contactForm.value.contact_number_type_default.value)).message) as { id: number }[]
      const id = response[0].id

      router.push({ path: `/contact/edit`, query: { id: `${id}` } })
    } catch (error) {
      router.push({ path: `/contacts` })
      console.error(error)
    }
  }
}

const updateContact = async () => {
  let isValid = true
  contactForm.value.first_name.error = contactForm.value.first_name.value === "" ? true : false
  contactForm.value.last_name.error = contactForm.value.last_name.value === "" ? true : false
  contactForm.value.email.error = contactForm.value.email.value === "" ? true : false
  contactForm.value.role.error = contactForm.value.role.value === "" ? true : false
  contactForm.value.contact_number_default.error = contactForm.value.contact_number_default.value === "" ? true : false
  contactForm.value.contact_number_type_default.error = contactForm.value.contact_number_type_default.value === "" ? true : false

  // Check if are invalid
  Object.values(contactForm.value).forEach((value) => {
    if (value.error === true) {
      // console.log(value.error_message)
      isValid = false
    }
  })

  if (isValid) {
    try {
      if (!id.value) {
        throw Error("id required to update contact")
      }

      loadingContactForm.value = true

      const response = JSON.parse((await update_contact(contactForm.value.first_name.value, contactForm.value.last_name.value, contactForm.value.role.value, "", contactForm.value.email.value, contactForm.value.contact_number_default.value, contactForm.value.contact_number_type_default.value, id.value ?? -1)).message) as { id: number }[]
      const editId = response[0].id

      // router.push({ path: `/contact/edit`, query: {id: `${editId}`} })
      router.push({ path: `/contacts` })
      loadingContactForm.value = false
    } catch (error) {
      router.push({ path: `/contacts` })
      console.error(error)
      loadingContactForm.value = false
    }
  }
}

const removeContact = async (id: number) => {
  if (id < 0) {
    return
  }
  try {
    // TODO Replace created_by with actual creator
    // TODO Add Loading animation
    const response = JSON.parse((await remove_contact(id)).message)
    router.push({ path: `/contacts` })
    console.log(response)
  } catch (error) {
    router.push({ path: `/contacts` })
    console.error(error)
  }
}

// Add/Edit/Remove Contact Info Form
let contactInfos: Ref<ContactInfo_w_UI[]> = ref([])
let loadingContactInfoForm: Ref<boolean> = ref(true)
let addingContactInfoRow: Ref<boolean> = ref(false)
let updatingContactInfoRow: Ref<boolean> = ref(false)

let contactInfoForm: Ref<{
  contact_number: { error_message: string; value: string; error: boolean }
  contact_number_type: { error_message: string; value: string; error: boolean }
}> = ref({
  contact_number: { error_message: "Contact Number is required.", value: "", error: false },
  contact_number_type: { error_message: "Contact Number Type is required.", value: "", error: false },
})

const addContactInfo = async () => {
  
  id.value = parseInt(router.currentRoute.value.query['id'] as string)
  const tempId = parseInt(router.currentRoute.value.query['id'] as string)
  console.log(tempId)
  if (!tempId) {
    throw Error("id required to to add contact info")
  }

  let isValid = true
  contactInfoForm.value.contact_number.error = contactInfoForm.value.contact_number.value === "" ? true : false
  contactInfoForm.value.contact_number_type.error = contactInfoForm.value.contact_number_type.value === "" ? true : false

  // Check if are invalid
  Object.values(contactInfoForm.value).forEach((value) => {
    if (value.error === true) {
      // console.log(value.error_message)
      isValid = false
    }
  })

  if (isValid) {
    try {
      // TODO Replace created_by with actual creator
      // TODO Add Loading animation
      const response = JSON.parse((await add_contact_info(contactInfoForm.value.contact_number.value, contactInfoForm.value.contact_number_type.value, id.value)).message)
      const newContactInfos = JSON.parse((await get_contact_info(id.value)).message)

      contactInfos.value = newContactInfos

      // Finished Adding
      addingContactInfoRow.value = false
    } catch (error) {
      console.error(error)
    }
  }
}

const clearContactInfoForm = () => {
  contactInfoForm.value.contact_number.value = ""
  contactInfoForm.value.contact_number_type.value = ""
}

const fillUpdateContactInfoForm = (contactInfo: ContactInfo) => {
  contactInfoForm.value.contact_number.value = contactInfo.contact_number
  contactInfoForm.value.contact_number_type.value = contactInfo.contact_number_type
}

const updateContactInfo = async (contactInfo: ContactInfo) => {
  if (!id.value) {
    throw Error("id required to to add contact info")
  }

  let isValid = true
  contactInfoForm.value.contact_number.error = contactInfoForm.value.contact_number.value === "" ? true : false
  contactInfoForm.value.contact_number_type.error = contactInfoForm.value.contact_number_type.value === "" ? true : false

  // Check if are invalid
  Object.values(contactInfoForm.value).forEach((value) => {
    if (value.error === true) {
      // console.log(value.error_message)
      isValid = false
    }
  })

  if (isValid) {
    try {
      // TODO Replace created_by with actual creator
      // TODO Add Loading animation
      const response = JSON.parse((await update_contact_info(contactInfoForm.value.contact_number.value, contactInfoForm.value.contact_number_type.value, contactInfo.contact_id)).message)
      const newContactInfos = JSON.parse((await get_contact_info(id.value)).message)

     contactInfos.value = newContactInfos
      console.log(response)

      // Finished updating
      updatingContactInfoRow.value = false
    } catch (error) {
      console.error(error)
    }
  }
}

const removeContactInfo = async (contact_id: number) => {
  if (!id.value) {
    throw Error("id required to remove contact info")
  }

  try {
    const response = JSON.parse((await remove_contact_info(contact_id)).message)
    const newContactInfos = JSON.parse((await get_contact_info(id.value)).message)

    contactInfos.value = newContactInfos
  } catch (error) {
    console.error(error)
  }
}

/** Are we editting or adding? */
let mode: Ref<"Add" | "Edit" | ""> = ref("")
let loading: Ref<boolean> = ref(false)
let lockContactTable: Ref<boolean> = ref(true)

onMounted(async () => {
  /**
   * Check if we are adding or editting a contact?
   */
  const route = useRoute()
  if (route.path === "/contact/add") {
    mode.value = "Add"
  }
  if (route.path === "/contact/edit") {
    mode.value = "Edit"
  }

  // Load contact into form for editting
  if (mode.value === "Edit") {
    try {
      const editId = parseInt(route.query.id as any)
      const response = JSON.parse((await get_contact_by_id(editId)).message)
      const contact = response[0] as Contact
      console.log(response)

      // Set form to current user
      contactForm.value.first_name.value = contact.first_name
      contactForm.value.last_name.value = contact.last_name
      contactForm.value.role.value = contact.contact_role
      contactForm.value.email.value = contact.email
      contactForm.value.contact_number_default.value = contact.contact_number_default
      contactForm.value.contact_number_type_default.value = contact.contact_number_type_default

      // Set the id so we can use it to delete the member, etc
      id.value = editId
    } catch (error) {
      console.error(error)
    }
    // load contact info into table / form
    try {
      const editId = parseInt(route.query.id as any)
      let response = JSON.parse((await get_contact_info(editId)).message) as ContactInfo_w_UI[]
      response.map((item) => {
        item.editting = false
        item.show = true
      })
      contactInfos.value = response
      console.log(response)

      id.value = editId
    } catch (error) {
      console.error(error)
    }
  }
})

onUpdated(async () => {
  /**
   * Check if we are adding or editting a contact?
   */
  const route = useRoute()
  console.log(route.path)

  if (route.path === "/contact/add") {
    mode.value = "Add"
  }
  if (route.path === "/contact/edit") {
    mode.value = "Edit"
  }
})

function cancel() {
  router.push({ path: "/contacts" })
}

const formActionReducer = (mode: "Add" | "Edit" | "") => {
  if (mode === "Add") {
    addContact()
  }
  if (mode === "Edit") {
    updateContact()
  }
}
</script>

<template>
  <main class="flex h-full">
    <div class="w-full m-auto">
      <div class="flex flex-row">
        <!--  -->
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" style="border-right-color: black; border-top-color: black" v-if="!loadingContactForm"></div>
        <!--  -->
        <div class="flex flex-row" v-if="loadingContactForm">
          <div class="flex flex-col">
            <div class="font-bold">First Name</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-240px" v-model="contactForm.first_name.value" /></div>
            <div class="font-bold mt-1">Last Name</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-240px" v-model="contactForm.last_name.value" /></div>
            <div class="font-bold mt-1">Email</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-240px" v-model="contactForm.email.value" /></div>
            <div class="font-bold mt-1">Role</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-240px" v-model="contactForm.role.value" /></div>
            <div class="font-bold mt-1">Contact Number (Default)</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-240px" v-model="contactForm.contact_number_default.value" /></div>
            <div class="font-bold mt-1">Contact Number Type (Default)</div>
            <div><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-240px" v-model="contactForm.contact_number_type_default.value" /></div>
            <!-- Errors -->
            <div>
              <div v-for="(value, index) in Object.values(contactForm)" :key="index">
                {{ value.error ? value.error_message : "" }}
              </div>
            </div>
          </div>
        </div>
        <!-- DEBUG -->
        <!-- <div>
          <pre>
            {{JSON.stringify(contactForm, 0, 1)}}
          </pre>
        </div> -->
        <!--  -->
        <div class="ml-auto" style="min-width: 400px" :class="{ 'hidden': mode === 'Add' ? true : false }">
          <div class="flex first-letter:flex-row">
            <div class="text-2xl font-bold">Contact Numbers ({{ contactInfos.length }})</div>
            <div class="ml-auto"><button class="h-8 px-4 rounded" @click="addingContactInfoRow = true; clearContactInfoForm()" v-if="!addingContactInfoRow && !updatingContactInfoRow">Add Row</button></div>
          </div>

          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th class="p-2"></th>
                <th class="p-2 font-bold">Contact Number</th>
                <th class="p-2 font-bold">Contact Number Type</th>
                <th class="p-2"></th>
              </tr>
            </thead>
            <tbody>


              <tr v-for="(contactInfo, index) in contactInfos" :key="index">
                <!--  -->
                <template v-if="contactInfos[index].editting">
                  <td class="p-2"><button class="pl-4 pr-4 rounded" @click="contactInfos[index].editting = false; updatingContactInfoRow = false;" v-if="updatingContactInfoRow">Cancel</button></td>
                  <td class="p-2"><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="contactInfoForm.contact_number.value" /></td>
                  <td class="p-2"><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="contactInfoForm.contact_number_type.value" /></td>
                  <td class="p-2"><button class="pl-4 pr-4 rounded" @click="updateContactInfo(contactInfo);">Update</button></td>
                </template>

                <!--  -->
                <template v-if="!contactInfos[index].editting">
                  <td class="p-2">
                    <button class="pl-4 pr-4 rounded" @click="contactInfos[index].editting = true; updatingContactInfoRow = true; fillUpdateContactInfoForm(contactInfo)" v-if="!updatingContactInfoRow && !addingContactInfoRow">Edit</button>
                  </td>
                  <td class="p-2">
                    <span>{{ contactInfo.contact_number }}</span>
                  </td>
                  <td class="p-2">
                    <span>{{ contactInfo.contact_number_type }}</span>
                  </td>
                  <td class="p-2">
                    <button class="pl-4 pr-4 danger rounded" @click="removeContactInfo(contactInfo.contact_id); updatingContactInfoRow = false;" v-if="!updatingContactInfoRow">Delete</button>
                  </td>
                </template>
              </tr>

              <tr v-if="addingContactInfoRow">
                <td class="p-2"><button class="pl-4 pr-4 rounded" @click="addingContactInfoRow = !addingContactInfoRow">Cancel</button></td>
                <td class="p-2"><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="contactInfoForm.contact_number.value" /></td>
                <td class="p-2"><input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="contactInfoForm.contact_number_type.value" /></td>
                <td class="p-2"><button class="pl-4 pr-4 rounded" @click="addContactInfo()">Add</button></td>
              </tr>
            </tbody>
          </table>

          <!-- Errors -->
          <div v-if="addingContactInfoRow || updatingContactInfoRow">
            <div v-for="(value, index) in Object.values(contactInfoForm)" :key="index">
              {{ value.error ? value.error_message : "" }}
            </div>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="flex flex-row mt-40 mb-10">
        <div class=""><button class="pl-4 pr-4 rounded" @click="cancel()">Cancel</button></div>
        <div class="ml-16"><button class="pl-4 pr-4 rounded" @click="formActionReducer(mode)">Save Contact</button></div>

        <div class="ml-auto"><button class="pl-4 pr-4 danger rounded" v-if="mode === 'Edit'" @click="removeContact(id ?? -1)">Delete Contact</button></div>
      </div>
    </div>
  </main>
</template>

<style>
.vertical-line {
  border-left: 6px dotted black;
  height: 500px;
}
</style>
