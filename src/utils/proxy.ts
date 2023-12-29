import process from 'node:process';
import { URL } from 'node:url';
import { ProxyAgent, setGlobalDispatcher } from 'undici';
import { config } from '@config';
import { HttpsProxyAgent } from 'https-proxy-agent';

type Auth =
  | undefined
  | {
      username: string;
      password: string;
    };

export function getProxy() {
  if (config.proxy === '') return undefined;
  const url = config.proxy;

  const {
    protocol: protocolRaw,
    username,
    password,
    hostname,
    port,
  } = new URL(url);

  const protocol = protocolRaw.replace(':', '') as 'http' | 'https';

  let auth: Auth;

  if (username !== '' && password !== '') {
    auth = {
      username,
      password,
    };
  }

  return {
    protocol,
    host: hostname,
    port: Number(port),
    auth,
  };
}

export function createProxy() {
  if (config.proxy === '') return undefined;
  return new HttpsProxyAgent(config.proxy);
}

export function setProxyEnv() {
  if (config.proxy !== '') {
    process.env.http_proxy = config.proxy;
    process.env.https_proxy = config.proxy;
    process.env.all_proxy = config.proxy;
  }

  if (process.env.http_proxy) {
    const agent = new ProxyAgent({
      uri: new URL(process.env.http_proxy).toString(),
    });
    setGlobalDispatcher(agent);
  }
}
