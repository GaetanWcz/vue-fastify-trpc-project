<template>
  <div class="app">
    <header class="header">
      <h1>Vue + tRPC + Drizzle Stack</h1>
      <nav>
        <button 
          @click="currentView = 'users'" 
          :class="{ active: currentView === 'users' }"
        >
          Utilisateurs
        </button>
        <button 
          @click="currentView = 'posts'" 
          :class="{ active: currentView === 'posts' }"
        >
          Articles
        </button>
      </nav>
    </header>

    <main class="main">
      <UsersList v-if="currentView === 'users'" />
      <PostsList v-if="currentView === 'posts'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UsersList from './components/UsersList.vue';
import PostsList from './components/PostsList.vue';

const currentView = ref<'users' | 'posts'>('users');
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  border-bottom: 2px solid #eee;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.header h1 {
  color: #333;
  margin-bottom: 15px;
}

.header nav {
  display: flex;
  gap: 10px;
}

.header button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
}

.header button:hover {
  background: #f5f5f5;
}

.header button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.main {
  min-height: 400px;
}
</style>