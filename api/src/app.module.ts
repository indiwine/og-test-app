import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { HelloResolverService } from './hello.resolver/hello.resolver.service';
import { OgAppModule } from './og-app/og-app.module';
import { PrismaModuleModule } from './prisma-module/prisma-module.module';
import * as process from 'node:process';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    OgAppModule,
    PrismaModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService, HelloResolverService],
})
export class AppModule {}
