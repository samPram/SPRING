// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as Joi from 'joi';
// import { RedisConfigService } from './config.service';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       validationSchema: Joi.object({
//         REDIS_HOST: Joi.string().required(),
//         REDIS_PORT: Joi.number().required(),
//         REDIS_PASSWORD: Joi.string().required(),
//       }),
//       load: [],
//     }),
//   ],
//   providers: [ConfigService, RedisConfigService],
//   exports: [ConfigService, RedisConfigService],
// })
// export class RedisConfigModule {}
