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
    ACL: "public-read", 
  })

 try {
    await s3.send(command)

    // Use the correct URL format based on the region
    // For most regions, the format is: https://bucket-name.s3.region.amazonaws.com/filename
    // For us-east-1, it might be: https://bucket-name.s3.amazonaws.com/filename
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
  } catch (error) {
    console.error("S3 upload error:", error)
    throw new Error("Failed to upload file to S3")
  }
}
