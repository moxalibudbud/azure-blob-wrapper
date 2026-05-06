import { test, expect, describe } from '@jest/globals';
import { BlobServiceClient } from '@azure/storage-blob';
import { createServiceClient } from '../blob-service-client';

describe('createServiceClient', () => {
  const accountName = 'testaccount';
  const accountKey = 'dGVzdGtleXRlc3RrZXl0ZXN0a2V5dGVzdGtleXRlc3RrZXl0ZXN0a2V5dGVzdGtleXRlc3RrZXk=';

  test('returns BlobServiceClient with sharedKey auth', () => {
    const client = createServiceClient({ type: 'sharedKey', accountName, accountKey });
    expect(client).toBeInstanceOf(BlobServiceClient);
    expect(client.url).toBe(`https://${accountName}.blob.core.windows.net/`);
  });

  test('returns BlobServiceClient with connectionString auth', () => {
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;
    const client = createServiceClient({ type: 'connectionString', connectionString });
    expect(client).toBeInstanceOf(BlobServiceClient);
  });

  test('returns BlobServiceClient with tokenCredential auth', () => {
    const credential = { getToken: async () => ({ token: 'test', expiresOnTimestamp: 0 }) };
    const client = createServiceClient({ type: 'tokenCredential', accountName, credential });
    expect(client).toBeInstanceOf(BlobServiceClient);
    expect(client.url).toBe(`https://${accountName}.blob.core.windows.net/`);
  });
});
