# DevContainer - Vue + tRPC + Drizzle Stack

Ce devcontainer fournit un environnement de développement complet et préconfigué pour la stack Vue + tRPC + Drizzle.

## 🚀 Démarrage rapide

### Option 1 : VS Code + Dev Containers
1. Installer l'extension [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Ouvrir le projet dans VS Code
3. Appuyer sur `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
4. Attendre la construction du container (première fois uniquement)

### Option 2 : GitHub Codespaces
1. Cliquer sur "Code" → "Codespaces" → "Create codespace on main"
2. Attendre l'initialisation complète

## 🛠️ Ce qui est inclus

### Environnement
- **Node.js 20** avec npm/pnpm
- **PostgreSQL 15** préconfigurée
- **Git, GitHub CLI**
- **Zsh + Oh My Zsh**

### Extensions VS Code
- **Vue 3** : Volar, TypeScript Vue Plugin
- **TypeScript** : Support complet avec IntelliSense
- **Prettier, ESLint** : Formatage automatique
- **Tailwind CSS** : Auto-complétion
- **GitHub Copilot** : Assistant IA
- **GitLens** : Git enrichi
- **Material Icons** : Icônes modernes

### Outils de développement
- **tsx** : Exécution TypeScript rapide
- **drizzle-kit** : Migrations de base de données
- **Prettier/ESLint** : Qualité de code
- **Vue CLI** : Outils Vue

## 🎯 Fonctionnalités DevContainer

### Auto-configuration
- **Installation automatique** des dépendances au démarrage
- **Migration DB automatique** lors du premier lancement
- **Ports forwarding** : 3000 (Vue), 3001 (API), 5432 (PostgreSQL)

### Commandes personnalisées (Zsh aliases)
```bash
npm-dev        # npm run dev
npm-build      # npm run build
db-push        # npm run db:push
db-migrate     # npm run db:migrate
ll             # ls -la
```

### Tâches VS Code intégrées
- `Ctrl+Shift+P` → "Tasks: Run Task"
- **Start Dev Server** : Lance client + serveur
- **Database Push** : Applique le schéma
- **Build Project** : Build complet
- **Type Check** : Vérification TypeScript

### Débogage intégré
- **F5** : Debug du serveur Node.js
- **Debug Full Stack** : Client + Serveur simultanément
- **Breakpoints** dans TypeScript/Vue

## 🔧 Configuration

### Variables d'environnement
- `DATABASE_URL` : Configurée automatiquement pour PostgreSQL
- `NODE_ENV=development`

### Base de données
- **PostgreSQL 15** avec extensions activées
- **Port** : 5432
- **Database** : `devdb`
- **User/Password** : `postgres/postgres`

### Networking
- **Client Vue** : http://localhost:3000
- **API tRPC** : http://localhost:3001
- **PostgreSQL** : localhost:5432

## 📁 Structure DevContainer

```
.devcontainer/
├── devcontainer.json    # Configuration principale
├── docker-compose.yml   # Services (dev + PostgreSQL)
├── Dockerfile          # Image personnalisée
├── postgres-init/      # Scripts d'initialisation DB
└── README.md           # Ce fichier
```

## 🚀 Avantages DevContainer

### Pour l'équipe
- **Environnement identique** pour tous les développeurs
- **Setup en 1 clic** sans configuration locale
- **Dépendances isolées** du système hôte

### Pour le développement
- **Hot reload** complet (client + serveur)
- **Type safety** bout en bout
- **Debug intégré** avec breakpoints
- **Extensions préconfigurées**

### Pour CI/CD
- **Image réutilisable** pour les pipelines
- **Configuration reproductible**
- **Tests dans le même environnement**

## 🔍 Dépannage

### Container ne démarre pas
```bash
# Reconstruire l'image
Ctrl+Shift+P → "Dev Containers: Rebuild Container"
```

### Base de données inaccessible
```bash
# Vérifier le statut PostgreSQL
docker-compose ps

# Logs PostgreSQL
docker-compose logs postgres
```

### Ports occupés
```bash
# Voir les processus sur les ports
sudo lsof -i :3000
sudo lsof -i :3001
sudo lsof -i :5432
```

### Performance lente
- Vérifier l'allocation mémoire Docker
- Utiliser WSL2 sur Windows
- Fermer les applications non nécessaires

## 📚 Ressources

- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Vue.js DevTools](https://devtools.vuejs.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 💡 Tips & Astuces

### Commandes utiles
```bash
# Voir tous les services
docker-compose ps

# Logs en temps réel
docker-compose logs -f

# Reset complet de la DB
docker-compose down -v && docker-compose up -d

# Shell dans le container
docker-compose exec devcontainer bash
```

### Personnalisation
- Modifier `.devcontainer/devcontainer.json` pour ajouter des extensions
- Ajouter des alias dans `.devcontainer/Dockerfile`
- Configurer des services supplémentaires dans `docker-compose.yml`

### Optimisation
- Utiliser `.dockerignore` pour exclure des fichiers
- Mettre en cache les `node_modules` avec des volumes
- Utiliser des images multi-stage pour la production
