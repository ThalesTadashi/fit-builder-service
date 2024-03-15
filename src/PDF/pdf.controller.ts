import { Controller, Get, Response, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

var wkhtmltopdf = require('wkhtmltopdf')
@Controller('pdf')
@ApiTags('Proposal')
export class PdfController {
  constructor() {}

  @Get('personal-pdf')
  @ApiResponse({ status: 200, description: 'Retorna o PDF' })
  async getProposalPdf(@Response({ passthrough: true }) res): Promise<StreamableFile> {
    try {
      const file = path.resolve(__dirname, '../../templates/my-training.hbs');
      const content = fs.readFileSync(file).toString('utf8');

      const template = Handlebars.compile(content);

      const data = {
        
          user: {
            name: "João",
            lastname: "Silva",
            age: 30,
            kg: 80,
            duration: "3 meses",
            initialDate: "01-01-2024",
            objective: "Perda de peso e ganho de massa muscular",
            observation: "Usuário está comprometido com o programa de treino.",
          },
          type: [
            {
              number: 1,
              exerciseName: "Supino",
              serie: 4,
              repetition: 12,
              rest: "60 segundos",
              neglect: "4 segundos",
              exercisePhoto: "https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg",
              linkVideo: "https://youtube.com",
              linkTips: "https://youtube.com",
              observation: "Manter a postura correta durante todo o exercício."
            },
            {
              number: 2,
              exerciseName: "Agachamento",
              serie: 4,
              repetition: 10,
              rest: "90 segundos",
              neglect: "3 segundos",
              exercisePhoto: "https://images.pexels.com/photos/4720242/pexels-photo-4720242.jpeg",
              linkVideo: "https://youtube.com",
              linkTips: "https://youtube.com",
              observation: "Cuidado para não inclinar o tronco para frente."
            },
            {
              number: 3,
              exerciseName: "Levantamento Terra",
              serie: 3,
              repetition: 8,
              rest: "120 segundos",
              neglect: "5 segundos",
              exercisePhoto: "https://images.pexels.com/photos/5032003/pexels-photo-5032003.jpeg",
              linkVideo: "https://youtube.com",
              linkTips: "https://youtube.com",
              observation: "Manter a coluna reta durante todo o movimento."
            }
          ]
        }
    
      

      let result = template(data);

      let stream = null;
      try {
          stream = await wkhtmltopdf(result, {
              FooterCenter: "página [page] de [topage]",
              marginTop: '0cm',
              marginRight: '0cm',
              marginLeft: '0cm',
          });
      } catch (e) {
          console.log(e.status,e);
      }
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="personal.pdf"`,
    });
    
      return new StreamableFile(stream);

  } catch (error) {
      console.log(error.status,error)
        }
  }

}
