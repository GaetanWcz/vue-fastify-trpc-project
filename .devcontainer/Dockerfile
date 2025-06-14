# .devcontainer/Dockerfile
FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# Arguments
ARG INSTALL_ZSH="true"
ARG UPGRADE_PACKAGES="false"
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Installation des outils système
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    postgresql-client \
    gnupg2 \
    curl \
    wget \
    unzip \
    git \
    sudo \
    zsh \
    fish \
    nano \
    vim \
    htop \
    tree \
    jq \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Installation de pnpm (alternative à npm)
RUN npm install -g pnpm@latest

# Installation d'outils de développement globaux
RUN npm install -g \
    @vue/cli \
    @vue/devtools \
    typescript \
    tsx \
    nodemon \
    prettier \
    eslint \
    drizzle-kit \
    concurrently

# Configuration de l'utilisateur
USER $USERNAME

# Configuration de Zsh avec Oh My Zsh
RUN if [ "$INSTALL_ZSH" = "true" ]; then \
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && echo 'export PATH=$PATH:/usr/local/bin' >> ~/.zshrc \
    && echo 'alias ll="ls -la"' >> ~/.zshrc \
    && echo 'alias la="ls -la"' >> ~/.zshrc \
    && echo 'alias npm-dev="npm run dev"' >> ~/.zshrc \
    && echo 'alias npm-build="npm run build"' >> ~/.zshrc \
    && echo 'alias db-push="npm run db:push"' >> ~/.zshrc \
    && echo 'alias db-migrate="npm run db:migrate"' >> ~/.zshrc \
    && echo 'alias db-studio="npm run db:studio"' >> ~/.zshrc \
    ; fi

# Configuration Git (optionnel)
RUN git config --global init.defaultBranch main \
    && git config --global pull.rebase false

# Création du répertoire de travail
WORKDIR /workspace

# Exposer les ports de développement
EXPOSE 3000 3001 5432
