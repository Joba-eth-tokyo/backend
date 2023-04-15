import { createHash } from 'crypto';
// import axios from 'axios';
// import { Logger } from '@nestjs/common';

// I use that API (https://www.gravatar.com).
export function getRandomGravatarAvatarByUserId(userId: string): string {
  const randomString = createHash('md5').update(userId).digest('hex');
  return `https://www.gravatar.com/avatar/${randomString}?d=identicon`;
}

// If you want to save to Base64, integrate that codes.
// async function convertPngUrlToBase64(url: string): Promise<string> {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const base64 = Buffer.from(response.data, 'binary').toString('base64');
//     return `data:image/png;base64,${base64}`;
//   } catch (error) {
//     Logger.error(`Failed to get image from ${url}. Error: ${error}`);
//     return '';
//   }
// }
