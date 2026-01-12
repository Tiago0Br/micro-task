import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string

  @IsNotEmpty()
  fullName: string

  @MinLength(6, { message: 'Senha curta (mínimo 6 caracteres).' })
  password: string
}
