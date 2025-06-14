// packages/client/src/utils/trpc.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

// Import du type depuis le serveur
import type { AppRouter } from '../../../server/src/routers/index';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
    }),
  ],
});

// Test de connexion avec la belle syntaxe !
export const testTrpc = async () => {
  try {
    console.log('🔍 Test de connexion tRPC...');
    const users = await trpc.user.getAll.query();
    console.log('✅ tRPC fonctionne! Utilisateurs:', users);
    return true;
  } catch (error) {
    console.error('❌ Erreur tRPC:', error);
    return false;
  }
};
