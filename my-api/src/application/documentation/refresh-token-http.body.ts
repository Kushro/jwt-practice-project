import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenHttpBody {
  @ApiProperty({ type: String, required: true })
  public readonly accessToken: string;
  @ApiProperty({ type: String, required: true })
  public readonly refreshToken: string;
}
