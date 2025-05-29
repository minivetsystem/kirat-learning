import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function uploadToS3(fileBuffer, fileName, fileType) {
  const bucket = process.env.AWS_S3_BUCKET_NAME

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileName,
    Body: fileBuffer,
    ContentType: fileType,
    ACL: "public-read", // optional: makes file accessible via URL
  })

  await s3.send(command)

  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
}
