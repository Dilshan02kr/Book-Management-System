import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserAuthService } from './user-auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/auth-payload';
import { User } from './entities/user.entity';

@Resolver()
export class UserAuthResolver {
  constructor(private readonly authService: UserAuthService) {}

  @Mutation(() => Boolean)
  register(@Args('data') data: RegisterInput) {
    return this.authService.register(data);
  }

  @Mutation(() => AuthPayload)
  login(@Args('data') data: LoginInput) {
    return this.authService.login(data);
  }

  @Query(() => [User])
  users() {
    return this.authService.getAllUsers();
  }
}
