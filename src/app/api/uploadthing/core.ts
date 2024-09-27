import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {auth} from "@clerk/nextjs/server"
import { insertUpload } from "@/src/server/db";

const f = createUploadthing();
 
export const ourFileRouter = {
  // Example "profile picture upload" route - these can be named whatever you want!
  thumbnail: f({image: { maxFileSize: "16MB", maxFileCount: 1, minFileCount: 1 },})
  .middleware(async ({ req }) => {
    // This code runs on your server before upload
    const user = await auth();

    // If you throw, the user will not be able to upload
    if (!user) throw new UploadThingError("Unauthorized");

    // Whatever is returned here is accessible in onUploadComplete as `metadata`
    return { userId: user.userId };
  }).onUploadComplete((data) =>{ console.log("file", data);
  }
),
 
  // This route takes an attached image OR video
  cours: f({pdf: { maxFileSize: "256MB", maxFileCount: 1, minFileCount: 1 },
    image: { maxFileSize: "16MB", maxFileCount: 1, minFileCount: 1 },
    })
  .middleware(async () => {
    // This code runs on your server before upload
    const user = await auth();
    // If you throw, the user will not be able to upload
    if (!user) throw new UploadThingError("Unauthorized");
    
    // Whatever is returned here is accessible in onUploadComplete as `metadata`
    return { userId: user.userId};
  }).onUploadComplete(async ({ metadata, file }) =>{ console.log("file",file );
    await insertUpload({  uploadURL: file.url });
    console.log("metadata upload");
   }),
 
 
  // Takes up to 4 2mb images and/or 1 256mb video
  mediaPost: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    pdf: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

