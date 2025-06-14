-- .devcontainer/postgres-init/init.sql
-- Script d'initialisation pour PostgreSQL

-- Création de la base de données de développement
CREATE DATABASE IF NOT EXISTS devdb;

-- Configuration des extensions utiles
\c devdb;

-- Extension pour les UUID (utile pour les clés primaires)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extension pour les fonctions de texte avancées
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Extension pour la recherche full-text
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Utilisateur de développement avec tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE devdb TO postgres;

-- Affichage des informations
SELECT 'Base de données devdb initialisée avec succès!' as message;