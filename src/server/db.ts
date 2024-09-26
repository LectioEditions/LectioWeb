"use strict";
import './envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql , desc ,like} from 'drizzle-orm'
import * as schema from './schema';
import { eq } from "drizzle-orm";
import { sql as pg, QueryResult } from '@vercel/postgres';
import { Cours, Courss, Impression } from '@/src/types';
import { User as NewUser } from '@/src/types';
import { auth } from '@clerk/nextjs/server';
export const db =  drizzle(pg, { schema });
 

export async function getUsers() {
  return await db.query.Users.findMany();
};

export async function getUserById (id?: number)  {
  if(!id) throw new Error('id is required');
  return await db.query.Users.findFirst(
    {where:(model,{eq})=>eq(model.id,id),}
   );}
export async function getUserByClerkId  (clerkId: string  | null | undefined)  {
  if(!clerkId) throw new Error('clerkId is required');
  return await db.query.Users.findFirst(
    {where:(model,{eq})=>eq(model.clerkId,clerkId),}
   );}

export async function insertUser  (user?: NewUser)  {
  if(!user) throw new Error('user is required');
  return await db.insert(schema.Users).values(user);
}
export async function UpdateUser  ( user?: NewUser)  {
  if(!user) throw new Error('user is required');
  return await db.update(schema.Users).set(user).where(eq(schema.Users.clerkId, user.clerkId));
}

export async function deleteUser (clerkId?: string)  {
  if(!clerkId) throw new Error('clerkId is required');
  return await db.delete(schema.Users).where(eq(schema.Users.clerkId, clerkId));
}
export async function getTopUserBycoursCount() {
  return await db.select().from(schema.Users).orderBy(desc(schema.Users.CoursCount)).limit(6).execute();
}
  export async function getCoursById (id?: number)  {
    if(!id) throw new Error('id is required');
    return await db.query.cours.findFirst(
      {where:(model,{eq})=>eq(model.id,id),}
     );
  }
  export async function getCoursByURL  (url: string ) {
    if(!url) throw new Error("no url");
    return await db.query.cours.findFirst({where:(eq(schema.cours.PdfUrl,url))})
    }

export async function getCourses() {
  return await db.query.cours.findMany();
}

export async function getCoursBySearch (search?: string)  {
  if(search === '') return; 
  if(!search) throw new Error('search is required');
  const ByTitle =  await db.select().from(schema.cours).where(like(schema.cours.Titre, `%${search}%`)).execute();
  if(ByTitle.length > 0) return ByTitle;
  const ByDescription = await db.select().from(schema.cours).where(like(schema.cours.description, `%${search}%`)).execute();
  if(ByDescription.length > 0) return ByDescription;
  return ;
}
export async function insertcours  (cours: Cours): Promise<Cours|undefined> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if(!cours) throw new Error('cours is required');
  cours.userId = user.userId;
  console.log(cours);
  
  const newCours = await db.insert(schema.cours).values(cours);
  if(newCours) return cours;
  return;
 }

export async function Updatecours (cours:Courss){
  return await db.update(schema.cours).set(cours).where(eq(schema.cours.PdfUrl, cours.PdfUrl));
}
 
export async function getCoursByUserId (userId: string | null)  {
  if(!userId) throw new Error('author is required');
  return  await db.select().from(schema.cours).where(eq(schema.cours.userId, userId)).execute();
}
export async function getCoursByTitle (title?: string)  {
  if(!title) throw new Error('title is required');
  return  await db.select().from(schema.cours).where(eq(schema.cours.PdfUrl, title)).execute();
}
export async function getCoursByDescription (description?: string)  {
  if(!description) throw new Error('description is required');
  return  await db.select().from(schema.cours).where(eq(schema.cours.description, description)).execute();
}


export async function getCoursMaxViews() {
  return  await db.select().from(schema.cours).orderBy(desc(schema.cours.Impression)).limit(1).execute();
}

export async function deletecours (id?: number)  {
  if(!id) throw new Error('id is required');
  // add deleting the audio and the image from uploadthing
  return await db.delete(schema.cours).where(eq(schema.cours.id, id));
}





export async function insertImpression (impression: Impression): Promise<Impression|undefined> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if(!impression) throw new Error('cours is required');
  impression.userId = user.userId;
  console.log(impression);
  
  const newCours = await db.insert(schema.impression).values(impression);
  if(newCours) return impression;
  return;
 }