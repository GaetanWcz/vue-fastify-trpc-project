<template>
  <div class="posts-container">
    <div class="section-header">
      <h2>Gestion des Articles</h2>
      <button @click="showCreateForm = !showCreateForm" class="btn-primary">
        {{ showCreateForm ? 'Annuler' : 'Nouvel Article' }}
      </button>
    </div>

    <!-- Formulaire de création -->
    <div v-if="showCreateForm" class="create-form">
      <h3>Créer un article</h3>
      <form @submit.prevent="createPost">
        <div class="form-group">
          <label>Auteur:</label>
          <select v-model="newPost.authorId" required>
            <option value="">Sélectionner un auteur</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }} ({{ user.email }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Titre:</label>
          <input v-model="newPost.title" type="text" required placeholder="Titre de l'article">
        </div>
        <div class="form-group">
          <label>Contenu:</label>
          <textarea v-model="newPost.content" required placeholder="Contenu de l'article" rows="5"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="isCreating" class="btn-primary">
            {{ isCreating ? 'Création...' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des articles -->
    <div class="posts-list">
      <div v-if="isLoading" class="loading">
        Chargement des articles...
      </div>

      <div v-else-if="error" class="error">
        Erreur: {{ error.message }}
      </div>

      <div v-else-if="posts?.length === 0" class="empty">
        Aucun article trouvé
      </div>

      <div v-else class="posts-grid">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <h3>{{ post.title }}</h3>
            <div class="post-meta">
              <span class="author">Par {{ post.author?.name }}</span>
              <span class="date">{{ formatDate(post.createdAt) }}</span>
            </div>
          </div>
          <div class="post-content">
            <p>{{ truncateContent(post.content) }}</p>
          </div>
          <div class="post-actions">
            <button @click="editPost(post)" class="btn-secondary">
              Modifier
            </button>
            <button @click="deletePost(post.id)" class="btn-danger">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'édition -->
    <div v-if="editingPost" class="modal-overlay" @click="cancelEdit">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Modifier l'article</h3>
          <button @click="cancelEdit" class="btn-close">×</button>
        </div>
        <form @submit.prevent="updatePost">
          <div class="form-group">
            <label>Titre:</label>
            <input v-model="editForm.title" type="text" required>
          </div>
          <div class="form-group">
            <label>Contenu:</label>
            <textarea v-model="editForm.content" required rows="5"></textarea>
          </div>
          <div class="form-actions">
            <button type="button" @click="cancelEdit" class="btn-secondary">
              Annuler
            </button>
            <button type="submit" :disabled="isUpdating" class="btn-primary">
              {{ isUpdating ? 'Mise à jour...' : 'Mettre à jour' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { trpc } from '../utils/trpc';

const queryClient = useQueryClient();
const showCreateForm = ref(false);
const editingPost = ref(null);

const newPost = reactive({
  title: '',
  content: '',
  authorId: null as number | null
});

const editForm = reactive({
  id: null as number | null,
  title: '',
  content: ''
});

const { data: posts, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: () => trpc.post.getAll.query(),
});

const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: () => trpc.user.getAll.query(),
});

const { mutate: createPostMutation, isPending: isCreating } = useMutation({
  mutationFn: (postData: { title: string; content: string; authorId: number }) =>
    trpc.post.create.mutate(postData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    newPost.title = '';
    newPost.content = '';
    newPost.authorId = null;
    showCreateForm.value = false;
  },
});

const { mutate: updatePostMutation, isPending: isUpdating } = useMutation({
  mutationFn: (postData: { id: number; title?: string; content?: string }) =>
    trpc.post.update.mutate(postData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    cancelEdit();
  },
});

const { mutate: deletePostMutation } = useMutation({
  mutationFn: (id: number) => trpc.post.delete.mutate({ id }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});

const createPost = () => {
  if (newPost.authorId) {
    createPostMutation({
      title: newPost.title,
      content: newPost.content,
      authorId: newPost.authorId
    });
  }
};

const editPost = (post: any) => {
  editingPost.value = post;
  editForm.id = post.id;
  editForm.title = post.title;
  editForm.content = post.content;
};

const updatePost = () => {
  if (editForm.id) {
    updatePostMutation({
      id: editForm.id,
      title: editForm.title,
      content: editForm.content
    });
  }
};

const cancelEdit = () => {
  editingPost.value = null;
  editForm.id = null;
  editForm.title = '';
  editForm.content = '';
};

const deletePost = (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
    deletePostMutation(id);
  }
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('fr-FR');
};

const truncateContent = (content: string, maxLength = 150) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
};
</script>

<style scoped>
.posts-container {
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

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
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

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #545b62;
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

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.post-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.post-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.post-header h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.post-content p {
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.post-actions {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}
</style>
