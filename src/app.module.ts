import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfModule } from './PDF/pdf.module';
import { PdfController } from './PDF/pdf.controller';

@Module({
  imports: [PdfModule],
  controllers: [AppController, PdfController],
  providers: [AppService],
})
export class AppModule {}
