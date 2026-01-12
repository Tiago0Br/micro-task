import { IsEmail } from 'class-validator'

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string

  password: string
}
