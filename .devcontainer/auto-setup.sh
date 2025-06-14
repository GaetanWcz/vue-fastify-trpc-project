#!/bin/bash
set -e

echo "🚀 Setup automatique du DevContainer..."

# 1. Installation des outils globaux
echo "📦 Installation des outils globaux..."
npm install -g drizzle-kit tsx

# 2. Installation des dépendances locales
echo "📦 Installation des dépendances locales..."
npm install

# 4. Application du schéma
echo "🗄️ Application du schéma de base de données..."
if npm run db:push; then
    echo "✅ Schéma appliqué avec succès!"
else
    echo "❌ Erreur lors de l'application du schéma"
    echo "💡 Vous devrez lancer 'npm run db:push' manuellement"
fi

# 5. Lancement de l'application
echo "🎉 Lancement de l'application..."
echo "🌐 Client: http://localhost:3000"
echo "🔗 API: http://localhost:3001"
echo ""

# Lancer l'app en mode dev
exec npm run dev
