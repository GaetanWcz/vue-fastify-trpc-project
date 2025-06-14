import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import { appRouter } from './routers/index.js';

const server = Fastify({
  logger: true,
  maxParamLength: 5000,
});

await server.register(cors, {
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname;
    if (hostname === 'localhost') {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed"), false);
  },
});

await server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter },
});

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
    console.log('🚀 Server ready at http://localhost:3001');
    console.log('📡 tRPC endpoint: http://localhost:3001/trpc');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
