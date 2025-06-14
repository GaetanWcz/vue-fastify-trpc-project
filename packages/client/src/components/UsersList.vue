<template>
  <div class="users-container">
    <div class="section-header">
      <h2>Gestion des Utilisateurs</h2>
      <button @click="showCreateForm = !showCreateForm" class="btn-primary">
        {{ showCreateForm ? 'Annuler' : 'Nouvel Utilisateur' }}
      </button>
    </div>

    <!-- Formulaire de création -->
    <div v-if="showCreateForm" class="create-form">
      <h3>Créer un utilisateur</h3>
      <form @submit.prevent="createUser">
        <div class="form-group">
          <label>Email:</label>
          <input v-model="newUser.email" type="email" required placeholder="john@example.com">
        </div>
        <div class="form-group">
          <label>Nom:</label>
          <input v-model="newUser.name" type="text" required placeholder="John Doe">
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="isCreating" class="btn-primary">
            {{ isCreating ? 'Création...' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des utilisateurs -->
    <div class="users-list">
      <div v-if="isLoading" class="loading">
        Chargement des utilisateurs...
      </div>

      <div v-else-if="error" class="error">
        Erreur: {{ error.message }}
      </div>

      <div v-else-if="users?.length === 0" class="empty">
        Aucun utilisateur trouvé
      </div>

      <div v-else class="users-grid">
        <div v-for="user in users" :key="user.id" class="user-card">
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
            <small>Créé le {{ formatDate(user.createdAt) }}</small>
          </div>
          <div class="user-actions">
            <button @click="deleteUser(user.id)" class="btn-danger">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { reactive, ref } from 'vue';
import { trpc } from '../utils/trpc';

const queryClient = useQueryClient();
const showCreateForm = ref(false);

const newUser = reactive({
  email: '',
  name: ''
});

const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => trpc.user.getAll.query(),
});

const { mutate: createUserMutation, isPending: isCreating } = useMutation({
  mutationFn: (userData: { email: string; name: string }) =>
    trpc.user.create.mutate(userData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    newUser.email = '';
    newUser.name = '';
    showCreateForm.value = false;
  },
});

const { mutate: deleteUserMutation } = useMutation({
  mutationFn: (id: number) => trpc.user.delete.mutate({ id }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

const createUser = () => {
  createUserMutation({ ...newUser });
};

const deleteUser = (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    deleteUserMutation(id);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};
</script>

<style scoped>
.users-container {
  padding: 20px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  color: #333;
  margin: 0;
}

.create-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.create-form h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  margin-top: 20px;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.btn-danger:hover {
  background: #c82333;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  color: #dc3545;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.user-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.user-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.user-info p {
  margin: 0 0 10px 0;
  color: #666;
}

.user-info small {
  color: #999;
}

.user-actions {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}
</style>
