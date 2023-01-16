import { ApiProperty } from '@nestjs/swagger';

export class LoginHttpBody {
  @ApiProperty({ type: String, required: true })
  public readonly username: string;
  @ApiProperty({ type: String, required: true })
  public readonly password: string;
}
