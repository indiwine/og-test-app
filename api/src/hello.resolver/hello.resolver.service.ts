import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloResolverService {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World from NestJS + GraphQL!';
  }
}
