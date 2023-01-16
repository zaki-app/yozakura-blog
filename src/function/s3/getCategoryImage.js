import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import DOMPurify from "dompurify";

export async function getS3CategoryImage (category) {
  const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
  const CREDENTIALS = {
    accessKeyId: process.env.NEXT_PUBLIC_ARTICLE_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_ARTICLE_SECRET_KEY,
  }

  const s3Client = new S3Client({ 
    region: REGION,
    credentials: CREDENTIALS,
  });
  
  // bucket
  const bucketParams = {
    Bucket: process.env.NEXT_PUBLIC_ARTICLE_BUCKET,
    Key: `category-image/${category}.svg`,
  };

  try {
    // get data
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const result = await data.Body?.transformToString();
    return result;
  } catch (err) {
    console.error("s3 get error", err);
  }
}