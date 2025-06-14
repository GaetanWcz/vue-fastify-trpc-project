# Vue + tRPC + Drizzle Stack

Une stack moderne full-stack TypeScript avec Vue 3, tRPC, Drizzle ORM et Fastify.

## 🚀 Technologies utilisées

- **Frontend**: Vue 3 + TypeScript + Vite + TanStack Query (Vue Query)
- **Backend**: Node.js + Fastify + tRPC
- **ORM**: Drizzle ORM
- **Base de données**: PostgreSQL
- **Monorepo**: npm workspaces

## 📁 Structure du projet

```
project/
├── packages/
│   ├── client/          # Application Vue 3
│   ├── server/          # API Fastify + tRPC
│   └── shared/          # Types partagés
├── docker-compose.yml   # PostgreSQL
└── package.json         # Configuration workspace
```

## 🛠️ Installation

### 1. Cloner et installer les dépendances

```bash
# Installer les dépendances
npm install

# Installer les dépendances des packages
npm install --workspaces
```

### 2. Configuration de la base de données

```bash
# Démarrer PostgreSQL avec Docker
docker-compose up -d

# Copier le fichier d'environnement
cp .env.example packages/server/.env
```

### 3. Générer et appliquer les migrations

```bash
# Générer les fichiers de migration
npm run db:generate --workspace=server

# Appliquer les migrations
npm run db:push
```

## 🚦 Démarrage

### Mode développement

```bash
# Démarrer le serveur et le client simultanément
npm run dev

# Ou séparément:
npm run dev:server  # http://localhost:3001
npm run dev:client  # http://localhost:3000
```

### Mode production

```bash
# Build
npm run build

# Démarrer le serveur
npm start --workspace=server
```

## 🔧 Scripts disponibles

### Global (racine)
- `npm run dev` - Démarre server + client
- `npm run build` - Build server + client
- `npm run db:push` - Applique le schéma à la DB
- `npm run db:migrate` - Lance les migrations

### Server (packages/server)
- `npm run dev --workspace=server` - Mode développement
- `npm run build --workspace=server` - Build TypeScript
- `npm run db:generate --workspace=server` - Génère les migrations

### Client (packages/client)
- `npm run dev --workspace=client` - Serveur de développement Vite
- `npm run build --workspace=client` - Build pour production

## 📝 Fonctionnalités de l'exemple

### Backend (tRPC + Drizzle)
- ✅ CRUD complet pour Users et Posts
- ✅ Relations entre tables (User → Posts)
- ✅ Validation avec Zod
- ✅ Migrations Drizzle
- ✅ Type-safety bout en bout

### Frontend (Vue 3)
- ✅ Interface de gestion des utilisateurs
- ✅ Interface de gestion des articles
- ✅ Formulaires de création/édition
- ✅ Cache et synchronisation avec TanStack Query
- ✅ Interface responsive

## 🎯 Points clés de cette stack

### Type Safety
- Types partagés entre client et serveur
- Drizzle génère les types depuis le schéma
- tRPC assure la cohérence des types API

### Performance
- Fastify (plus rapide qu'Express)
- Drizzle ORM optimisé
- TanStack Query pour le cache côté client
- Hot reload en développement

### Developer Experience
- Auto-complétion partout
- Erreurs TypeScript en temps réel
- Migrations automatiques
- Setup monorepo simple

## 🔄 Workflow de développement

1. **Modifier le schéma** (`packages/server/src/db/schema.ts`)
2. **Générer la migration**: `npm run db:generate --workspace=server`
3. **Appliquer**: `npm run db:push`
4. **Ajouter les routes tRPC** (`packages/server/src/routers/index.ts`)
5. **Utiliser dans Vue** avec auto-complétion complète

## 📦 Ajout de nouvelles fonctionnalités

### Nouvelle table
1. Ajouter dans `schema.ts`
2. Générer migration
3. Créer les routes tRPC
4. Implémenter côté Vue

### Nouvelles routes API
1. Ajouter dans le router tRPC
2. Types automatiquement disponibles côté client
3. Utiliser avec `trpc.nouvelleroute.query()`

## 🔒 Variables d'environnement

```bash
# packages/server/.env
DATABASE_URL=postgres://user:password@localhost:5432/mydb
```

## 📚 Documentation

- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vue 3](https://vuejs.org/)
- [Fastify](https://www.fastify.io/)
- [TanStack Query](https://tanstack.com/query)

## 🚀 Prêt pour la production

Cette stack est optimisée pour:
- Déploiement Docker
- Variables d'environnement
- Build optimisé
- Monitoring et logging
- Scaling horizontal
