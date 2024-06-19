import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "@/components/db";

const f = createUploadthing();
 
export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.url); // Fetch the image
      const buffer = await res.arrayBuffer(); // Convert to a buffer

      const imgMetaData = await sharp(buffer).metadata();
      const { width, height } = imgMetaData;

      // There is no config for step 1
      // We need to create one
      if (!configId) {
        const config = await db.configuration.create({
          data: {
            imgUrl: file.url,
            height: height || 500,
            width: width || 500,
          }
        });

        return { configId: config.id };
      }

      return { configId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;