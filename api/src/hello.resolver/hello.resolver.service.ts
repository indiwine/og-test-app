import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloResolverService {
  @Query(() => String, { description: 'Returns a greeting message' })
  sayHello(): string {
    return 'Hello World from NestJS + GraphQL!';
  }
}
