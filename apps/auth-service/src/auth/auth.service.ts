import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcryptjs'
import type { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { LoginDto } from './dto/login.dto'
import type { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.usersRepository.findOne({
      where: { email: dto.email }
    })
    if (exists) throw new ConflictException('E-mail já cadastrado.')

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(dto.password, salt)

    const user = this.usersRepository.create({
      email: dto.email,
      fullName: dto.fullName,
      passwordHash
    })

    await this.usersRepository.save(user)

    return {
      id: user.id,
      email: user.email,
      full_name: user.fullName,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString()
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email }
    })

    if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciais inválidas.')
    }

    const payload = {
      sub: user.id,
      email: user.email
    }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName
      }
    }
  }
}
