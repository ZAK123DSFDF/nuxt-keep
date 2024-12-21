<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in data" :key="user.id">
        <div>
          {{ user.name }} - {{ user.email }}
          <button
            :disabled="getStatus(user.id, 'delete')"
            @click="deleteUser(user.id)"
          >
            {{ getStatus(user.id, "delete") ? "Deleting..." : "Delete" }}
          </button>
          <button
            :disabled="getStatus(user.id, 'update')"
            @click="updateUser(user.id)"
          >
            {{ getStatus(user.id, "update") ? "Updating..." : "Update" }}
          </button>
        </div>
      </li>
    </ul>

    <div>
      <h2>Add New User</h2>
      <input v-model="newName" placeholder="Name" />
      <input v-model="newEmail" placeholder="Email" />
      <button :disabled="isLoading" @click="addUser">
        {{ isLoading ? "Adding..." : "Add User" }}
      </button>
    </div>

    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useFetch } from "nuxt/app"
import { v4 as uuidv4 } from "uuid"
import { useStatusStore } from "~/composables/useStatusStore"

const error = ref<string | null>(null)
const isLoading = ref(false)
const { status, setStatus, getStatus } = useStatusStore()

const { data, execute } = useFetch<any>("http://localhost:3001/users", {
  immediate: true,
})

const newName = ref("")
const newEmail = ref("")

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const refreshUsers = async () => {
  try {
    error.value = null
    await execute()
  } catch (err) {
    console.error(err)
    error.value = "Failed to fetch users."
  }
}

const addUser = async () => {
  if (!newName.value || !newEmail.value) {
    error.value = "Name and email are required."
    return
  }
  isLoading.value = true
  try {
    error.value = null
    await delay(1000)
    await $fetch("http://localhost:3001/users", {
      method: "POST",
      body: {
        id: uuidv4(),
        name: newName.value,
        email: newEmail.value,
      },
    })
    newName.value = ""
    newEmail.value = ""
    await refreshUsers()
  } catch (err) {
    console.error(err)
    error.value = "Failed to add user."
  } finally {
    isLoading.value = false
  }
}

const updateUser = async (id: string) => {
  const name = prompt("Enter the new name:")
  const email = prompt("Enter the new email:")
  if (!name || !email) {
    error.value = "Both name and email are required."
    return
  }

  setStatus(id, "update", true) // Set loading state
  try {
    error.value = null
    await delay(1000) // Simulate delay
    await $fetch(`http://localhost:3001/users/${id}`, {
      method: "PATCH",
      body: { name, email },
    })
    await refreshUsers()
  } catch (err) {
    console.error(err)
    error.value = `Failed to update user with ID ${id}.`
  } finally {
    setStatus(id, "update", false) // Reset loading state
  }
}

const deleteUser = async (id: string) => {
  if (!confirm("Are you sure you want to delete this user?")) {
    return
  }

  setStatus(id, "delete", true) // Set loading state
  try {
    error.value = null
    await delay(1000) // Simulate delay
    await $fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" })
    await refreshUsers()
  } catch (err) {
    console.error(err)
    error.value = `Failed to delete user with ID ${id}.`
  } finally {
    setStatus(id, "delete", false) // Reset loading state
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
