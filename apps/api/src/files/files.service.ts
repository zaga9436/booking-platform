import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import { Multer } from 'multer';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  private s3 = new S3Client({
    region: 'us-east-1',
    endpoint: process.env.MINIO_ENDPOINT, 
    credentials: { 
        accessKeyId: process.env.MINIO_ACCESS_KEY ?? '',
        secretAccessKey: process.env.MINIO_SECRET_KEY ?? '', 
    },
    forcePathStyle: true,
  });

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${uuidv4()}-${file.originalname}`;
    
    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return `${process.env.MINIO_ENDPOINT}/booking-images/${fileName}`;;
  }

  async getFileStream(fileName: string){
    const command = new GetObjectCommand({
      Bucket: process.env.MINIO_BUCKET,
      Key: fileName,
    });

    const response = await this.s3.send(command);

    return response.Body as Readable;
  }
}
