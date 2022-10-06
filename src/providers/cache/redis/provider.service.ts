// import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
// import { Cache } from 'cache-manager';

// @Injectable()
// export class RedisProviderService {
//   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
//   // get
//   async getCache(key: any) {
//     try {
//       const data = await this.cacheManager.get(key);
//       console.log(data);
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // set
//   async setCacheData(key: any, data: any, ttl: number) {
//     try {
//       await this.cacheManager.set(key, data, ttl);
//     } catch (error) {
//       console.log('Error set cache redis!');
//     }
//   }
//   // del
//   async delCacheData(key: string) {
//     try {
//       await this.cacheManager.del(key);
//     } catch (error) {
//       console.log('Error del cache redis!');
//     }
//   }
// }
