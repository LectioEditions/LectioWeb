import "server-only"
import {db} from "~/server/db/index"
import {auth} from "@clerk/nextjs/server"
import { images } from "./schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import analyticsServerClient from "../analytics";
export async function getMyImages(){
    const user = auth();
    if(!user.userId) throw new Error("unauthorized")

    const images = await db.query.images.findMany({
        where:(model,{eq})=>eq(model.userId,user.userId),
        orderBy:(model,{desc})=>desc(model.id),
      });
      return images;
}
export async function deleteImage(id:number){
  const user=auth();
  if (!user.userId) throw new Error("Unauthorized");
  
  await db.delete(images).where(and(eq(images.id,id),eq(images.userId,user.userId)));
  analyticsServerClient.capture({
    distinctId:user.userId,
    event:"delete image",
    properties:{
    imageId: id,
    }, 
  })
  redirect("/");
}


export async function getImage(id : number){
     const user =auth();
     if(!user) throw new Error ("unauthorized");
     const image = await db.query.images.findFirst(
      {where:(model,{eq})=>eq(model.id,id),}
     );
     if(!image) throw new Error("Image not found");
     return image;
}