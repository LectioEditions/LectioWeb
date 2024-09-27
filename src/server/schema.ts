import { drizzle } from 'drizzle-orm/vercel-postgres';
import { db, sql } from '@vercel/postgres';
import {
    index,
  integer,
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `lection_${name}`);

export const Users = createTable(
    'users',
    {
      id: serial('id').primaryKey(),
      name: text('name').notNull(),
      email: text('email').notNull(),
      image: text('image').notNull(),
      clerkId: text('clerkId').notNull(),
      createdAt: timestamp('createdAt').defaultNow().notNull(),
      CoursCount: integer('CoursCount').default(0).notNull(),
      impression: integer('views').default(0).notNull(),
    },
    (users) => {
      return {
        uniqId: uniqueIndex('uniq_idx').on(users.email),
      };
    },
  );

export const cours = createTable(
  'cours',
  {id : serial('id').primaryKey(),
    Titre: text('title').notNull(),
    description: text('description').notNull(),
    PdfUrl : text('PdfUrl').notNull(),
    userId: text('userId').references(()=>Users.clerkId),
    imageURL: text('imageURL').notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    Impression: integer('Impression').default(0).notNull(),

  },
  (example) => ({
    titreIndx: index("titreId").on(example.Titre),
  })
);

export const impression = createTable(
  'impression',
  {id : serial('id').primaryKey(),
    Adress: text('Adress').notNull(),
    Commune: text('Commune').notNull(),
    Quantite: integer('Quantite').notNull(),
    NumTel: text('NumTel').notNull(),
    PdfUrl : text('PdfUrl').notNull(),
    userId: text('userId').references(()=>Users.clerkId),
    imageURL: text('imageURL').notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),

  },

);


export const Uploads = createTable(
  'Uploads',
  {id : serial('id').primaryKey(),
    uploadURL: text('imageURL').notNull(),

  },
  (example) => ({
    UploadsIndex: index("titlesId").on(example.uploadURL),
  })
);



  