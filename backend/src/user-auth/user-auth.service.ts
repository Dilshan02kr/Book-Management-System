import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/auth-payload';

@Injectable()
export class UserAuthService {
  private users: User[] = [];

  register(data: RegisterInput): boolean {
    const userExists = this.users.find(
      (user) => user.username === data.username,
    );
    if (userExists) {
      throw new Error('Username already taken');
    }

    const newUser: User = {
      id: Date.now().toString(),
      ...data,
    };
    this.users.push(newUser);
    return true;
  }

  login(data: LoginInput): AuthPayload {
    const user = this.users.find(
      (user) =>
        user.username === data.username && user.password === data.password,
    );

    if (!user) throw new UnauthorizedException('Invalid credentials');
    return {
      token: 'fake-token-123',
      user,
    };
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
