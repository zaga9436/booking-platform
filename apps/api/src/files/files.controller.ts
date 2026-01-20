import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { FilesService } from './files.service';
import type { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }


  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const stream = await this.filesService.getFileStream(fileName);
    stream.pipe(res);
  }
}
