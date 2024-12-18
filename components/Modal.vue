<template>
  <div v-show="visible" class="modal-backdrop">
    <div class="modal">
      <button class="close-btn" @click="closeModal">X</button>
      <h2>Upload Image</h2>

      <!-- Image upload input -->
      <input type="file" accept="image/*" @change="handleImageUpload" />

      <!-- Display the selected image -->
      <div v-if="imageSrc" class="image-preview">
        <h3>Preview:</h3>
        <img :src="imageSrc" alt="Uploaded Image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
const emit = defineEmits(["close"])

const visible = ref(true)
const imageSrc = ref(null)

const closeModal = () => {
  visible.value = false
  emit("close")
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imageSrc.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}
.close-btn {
  float: right;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.image-preview img {
  margin-top: 10px;
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
