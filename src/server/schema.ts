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
  uniqueIndex,PgArray
} from 'drizzle-orm/pg-core';
import { boolean } from "drizzle-orm/pg-core";

import { foreignKey } from 'drizzle-orm/pg-core';

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
      ItemCount: integer('ItemCount').default(0).notNull(),
      Achat: integer('Achat').default(0).notNull(),
    },
    (users) => {
      return {
        uniqId: uniqueIndex('uniq_idx').on(users.email),
      };
    },
  );

export const Item = createTable(
  'Item',
  {id : serial('id').primaryKey(),
    Titre: text('title').notNull(),
    Category: text('Category').notNull(),
    description: text('description').notNull(),
    Annee: text('Annee').notNull(),
    Module: text('Module').notNull(),
    Type: text('Type').notNull(),
    PdfUrl : text('PdfUrl').notNull(),
    userId: text('userId').references(()=>Users.clerkId),
    imageURL: text('imageURL').notNull(),
    Prix: integer('Prix'),
    etat: text('etat'),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    Achat: integer('Achat').default(0).notNull(),

  },
  (example) => ({
    titreIndx: index("titreId").on(example.Titre),
  })
);

export const CartItem = createTable(
  'CartItem',
  {id : serial('id').primaryKey(),
    Quantite: integer('Quantite').notNull(),
    PdfUrl : text('PdfUrl').notNull(),
    idItem: integer('idItem').references(()=>Item.id),
    OrderId: integer('OrderId').references(()=>Order.id),
    userId: text('userId').references(()=>Users.clerkId),
    Type: text('Type').notNull(),
    Prix: integer('Prix'),


    
  },

);

export const Order = createTable(
  'Order',
  {
    id: serial('id').primaryKey(),
    identifier: integer('identifier').notNull(),
    Prix: integer('Prix'),
    NumTel: text('NumTel').notNull(),
    Adress: text('Adress').notNull(),
    Commune: text('Commune').notNull(),
    Traite: boolean('Traite').default(false).notNull(),
    userId: text('userId').references(() => Users.clerkId),
    imageURL: text('imageURL').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
    

  }
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



  