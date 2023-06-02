import { URL } from 'node:url';
import { config } from '@config';
import { HttpsProxyAgent } from 'https-proxy-agent';

export function getProxy() {
  const url = config.proxy;

  const { protocol: proto, username, password, hostname, port } = new URL(url);

  const protocol = proto.replace(':', '') as 'http' | 'https';

  let auth:
    | {
        username: string;
        password: string;
      }
    | undefined;

  if (username !== '' && password !== '') {
    auth = {
      username,
      password,
    };
  }

  return {
    protocol,
    hostname,
    port: Number(port),
    auth,
  };
}

export function createProxy() {
  return new HttpsProxyAgent(config.proxy);
}
