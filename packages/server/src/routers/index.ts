// packages/server/src/routers/index.ts
import { z } from 'zod';
import { eq, desc } from 'drizzle-orm';
import { initTRPC } from '@trpc/server';
import { db } from '../db/index.js';
import { users, posts } from '../db/schema.js';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Créer des sous-routers séparés
const userRouter = router({
  getAll: publicProcedure
    .query(async () => {
      return await db.select().from(users).orderBy(desc(users.createdAt));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.id, input.id),
        with: {
          posts: {
            orderBy: desc(posts.createdAt)
          }
        }
      });
      if (!user) throw new Error('User not found');
      return user;
    }),

  create: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().min(1)
    }))
    .mutation(async ({ input }) => {
      const [user] = await db.insert(users)
        .values(input)
        .returning();
      return user;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(users).where(eq(users.id, input.id));
      return { success: true };
    })
});

const postRouter = router({
  getAll: publicProcedure
    .query(async () => {
      return await db.query.posts.findMany({
        with: {
          author: true
        },
        orderBy: desc(posts.createdAt)
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const post = await db.query.posts.findFirst({
        where: eq(posts.id, input.id),
        with: {
          author: true
        }
      });
      if (!post) throw new Error('Post not found');
      return post;
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      authorId: z.number()
    }))
    .mutation(async ({ input }) => {
      const [post] = await db.insert(posts)
        .values(input)
        .returning();
      return post;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional()
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      const [post] = await db.update(posts)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(posts.id, id))
        .returning();
      return post;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    })
});

// Assembler le router principal
export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
