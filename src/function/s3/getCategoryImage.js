import { GetObjectAclCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function getS3CategoryImage () {
  const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
  const CREDENTIALS = {
    accessKeyId: process.env.NEXT_PUBLIC_ARTICLE_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_ARTICLE_SECRET_KEY,
  }
  console.log("情報", CREDENTIALS);

  const s3Client = new S3Client({ 
    region: REGION,
    credentials: CREDENTIALS,
  });
  
  // bucket
  const bucketParams = {
    Bucket: process.env.NEXT_PUBLIC_ARTICLE_BUCKET,
    Key: "category-image/sass.svg",
  };
  console.log("パラムス", );

  try {
    // get data
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    return data.Body.transformToString();
  } catch (err) {
    console.error("s3 get error", err);
  }
}