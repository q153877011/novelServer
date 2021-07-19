import { PrivateKeyInput } from 'crypto';
import { async } from 'rxjs';
import { request } from 'src/network/request';

export async function searchNovel(name: string): Promise<any> {
  return request({
    url: '/modules/article/search.php',
    params: {
      q: name,
      searchtype: 'all',
      s: '17333194950446968473',
    },
  });
}

export async function getChapters(url: string): Promise<any> {
  return request({
    url: url.slice('http://www.imayitxt.com'.length),
  });
}

export async function getContent(url: string): Promise<any> {
  return request({
    url: url.slice('http://www.imayitxt.com'.length),
  });
}
