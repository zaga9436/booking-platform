import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import { Multer } from 'multer';

@Injectable()
export class FilesService {
  private s3 = new S3Client({
    region: 'us-east-1',
    endpoint: 'http://localhost:9000', 
    credentials: { accessKeyId: 'minioadmin', secretAccessKey: 'minioadmin' },
    forcePathStyle: true,
  });

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${uuidv4()}-${file.originalname}`;
    
    await this.s3.send(
      new PutObjectCommand({
        Bucket: 'booking-images',
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `http://localhost:9000/booking-images/${fileName}`;
  }
}
