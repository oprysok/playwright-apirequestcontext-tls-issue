import { test, expect, request } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const clientCertificates = [{
  origin: 'https://127.0.0.1:3003',
  cert: fs.readFileSync(path.join(__dirname, '../certs/server.crt')),
  key: fs.readFileSync(path.join(__dirname, '../certs/server.key')),
}];

test.use({
  clientCertificates,
})

test('browser context request with client certificate', async ({ browser }) => {
  const context = await browser.newContext({
    clientCertificates
  });

  await expect(context.request.get('https://127.0.0.1:3003/api/sample')).rejects.toThrow('apiRequestContext.get: self-signed certificate');
});

test('global request with client certificate', async () => {
  const requestContext = await request.newContext({
    clientCertificates
  });

  await expect(requestContext.get('https://127.0.0.1:3003/api/sample')).rejects.toThrow('apiRequestContext.get: self-signed certificate');
});