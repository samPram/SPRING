import { CacheModule, CacheModuleOptions, Module } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisProviderService } from './provider.service';

@Module({
  imports: [
    CacheModule.register(),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) =>
    //     ({
    //       store: redisStore,
    //       // ttl: configService.get('CACHE_TTL'),
    //       host: configService.get<string>('redis.host'),
    //       port: configService.get<number>('redis.port'),
    //       password: configService.get<string>('redis.password'),
    //     } as CacheModuleOptions),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [ConfigService, RedisProviderService],
  exports: [ConfigService, RedisProviderService],
})
export class RedisProviderModule {}
