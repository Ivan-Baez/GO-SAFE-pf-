// CreateQaaDto
import { ApiProperty } from '@nestjs/swagger';

export class CreateQaaDto {
  @ApiProperty({ example: '¿Cuál es la política de cancelación?' })
  question: string;

  @ApiProperty({ example: 'Podés cancelar hasta 24 horas antes.' })
  answer?: string;

  @ApiProperty({ example: 'uuid-v4', description: 'ID del usuario que crea la pregunta' })
  userId: string;

  @ApiProperty({ example: 'uuid-v4', description: 'ID de la experiencia asociada' })
  experienceId: string;
}