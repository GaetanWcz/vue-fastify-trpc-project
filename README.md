# Vue + tRPC + Drizzle Stack

A modern full-stack TypeScript stack with Vue 3, tRPC, Drizzle ORM and Fastify.

## 🚀 Technologies

- **Frontend**: Vue 3 + TypeScript + Vite + TanStack Query (Vue Query)
- **Backend**: Node.js + Fastify + tRPC
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Monorepo**: npm workspaces

## 📁 Project Structure

```
project/
├── packages/
│   ├── client/          # Vue 3 application
│   ├── server/          # Fastify + tRPC API
│   └── shared/          # Shared types
├── docker-compose.yml   # PostgreSQL
└── package.json         # Workspace configuration
```

## 🛠️ Installation

### 1. Clone and install dependencies

```bash
# Install dependencies
npm install

# Install workspace dependencies
npm install --workspaces
```

### 2. Database setup

```bash
# Start PostgreSQL with Docker
docker compose up -d

# Copy environment file
cp .env.example packages/server/.env
```

### 3. Generate and apply migrations

```bash
# Generate migration files
npm run db:generate --workspace=server

# Apply migrations
npm run db:push
```

## 🚦 Getting Started

### Development mode

```bash
# Start both server and client
npm run dev

# Or separately:
npm run dev:server  # http://localhost:3001
npm run dev:client  # http://localhost:3000
```

### Production mode

```bash
# Build
npm run build

# Start server
npm start --workspace=server
```

## 🔧 Available Scripts

### Global (root)
- `npm run dev` - Start server + client
- `npm run build` - Build server + client
- `npm run db:push` - Apply schema to DB
- `npm run db:migrate` - Run migrations

### Server (packages/server)
- `npm run dev --workspace=server` - Development mode
- `npm run build --workspace=server` - Build TypeScript
- `npm run db:generate --workspace=server` - Generate migrations

### Client (packages/client)
- `npm run dev --workspace=client` - Vite dev server
- `npm run build --workspace=client` - Build for production

## 📝 Example Features

### Backend (tRPC + Drizzle)
- ✅ Full CRUD for Users and Posts
- ✅ Table relations (User → Posts)
- ✅ Validation with Zod
- ✅ Drizzle migrations
- ✅ End-to-end type safety

### Frontend (Vue 3)
- ✅ User management interface
- ✅ Post management interface
- ✅ Create/edit forms
- ✅ Caching and sync with TanStack Query
- ✅ Responsive interface

## 🎯 Key Benefits of This Stack

### Type Safety
- Shared types between client and server
- Drizzle generates types from schema
- tRPC ensures API type consistency

### Performance
- Fastify (faster than Express)
- Optimized Drizzle ORM
- TanStack Query for client-side caching
- Hot reload in development

### Developer Experience
- Auto-completion everywhere
- Real-time TypeScript errors
- Automatic migrations
- Simple monorepo setup

## 🔄 Development Workflow

1. **Modify schema** (`packages/server/src/db/schema.ts`)
2. **Generate migration**: `npm run db:generate --workspace=server`
3. **Apply**: `npm run db:push`
4. **Add tRPC routes** (`packages/server/src/routers/index.ts`)
5. **Use in Vue** with full auto-completion

## 📦 Adding New Features

### New table
1. Add to `schema.ts`
2. Generate migration
3. Create tRPC routes
4. Implement in Vue

### New API routes
1. Add to tRPC router
2. Types automatically available on client
3. Use with `trpc.newroute.query()`

## 🔒 Environment Variables

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

## 🚀 Production Ready

This stack is optimized for:
- Docker deployment
- Environment variables
- Optimized builds
- Monitoring and logging
- Horizontal scaling
