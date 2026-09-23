<script setup>
import { ref } from 'vue'

const BACKEND = 'http://localhost:8080'

const text = ref('')
const status = ref('')

async function send() {
  try {
    const resp = await fetch(`${BACKEND}/api/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.value }),
    })
    const data = await resp.json()
    if (resp.ok) {
      status.value = 'Отправлено'
      text.value = ''
    } else {
      status.value = 'Ошибка: ' + data.message
    }
  } catch (e) {
    status.value = 'Бэкенд недоступен'
  }
}
</script>

<template>
  <h1>Frontend v1.0</h1>
  <input v-model="text" type="text" placeholder="Введите текст" />
  <button @click="send">Отправить</button>
  <p>{{ status }}</p>
</template>
