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

const query = ref('')
const result = ref('')

async function load() {
  try {
    const resp = await fetch(`${BACKEND}/api/data`)
    const data = await resp.json()
    let lines = data.content.split('\n').filter(Boolean)
    const q = query.value.trim().toLowerCase()
    if (q) {
      lines = lines.filter((l) => l.toLowerCase().includes(q))
    }
    result.value = lines.join('\n')
  } catch (e) {
    result.value = 'Бэкенд недоступен'
  }
}
</script>

<template>
  <h1>Frontend v2.0</h1>

  <h2>Отправка данных</h2>
  <input v-model="text" type="text" placeholder="Введите текст" />
  <button @click="send">Отправить</button>
  <p>{{ status }}</p>

  <h2>Чтение данных</h2>
  <input v-model="query" type="text" placeholder="Фильтр (можно пустой)" />
  <button @click="load">Получить данные</button>
  <br />
  <textarea v-model="result" rows="10" cols="50" readonly
            placeholder="Здесь появится содержимое data.txt"></textarea>
</template>
