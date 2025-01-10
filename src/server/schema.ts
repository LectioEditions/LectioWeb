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
import { boolean,bigint } from "drizzle-orm/pg-core";

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
  'Items',
  {id : serial('id').primaryKey(),
    Titre: text('title').notNull(),
    Departement: text('Departement').notNull(),
    description: text('description').notNull(),
    Annee: text('Annee').notNull(),
    NivUniv: text('NivUniv').notNull(),
    Module: text('Module').notNull(),
    Unite: text('Unite'),
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
    idItem: integer('idItem').notNull(),
    OrderId: text('OrderId').default(""),
    userId: text('userId'),
    Type: text('Type').notNull(),
    Prix: integer('Prix'),
  },

);

export const Order = createTable(
  'Order',
  {
    id: serial('id').primaryKey(),
    identifier: text('identifier'),
    Prix: integer('Prix').default(0),
    NumTel: text('NumTel').notNull(),
    
    Wilaya: text('Wilaya').notNull(),
     Status: text('Status').default("En Attente"),
    Temps : text('temps').default("0"),
    userId: text('userId').references(() => Users.clerkId),
    agenId: text('agenId').references(() => Users.clerkId),

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



  
