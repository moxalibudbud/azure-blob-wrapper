import { test, expect, describe } from '@jest/globals';
import { BlobClient } from '@azure/storage-blob';
import { createBlobClient } from '../blob-client';

const BLOB_URL = 'https://storageaccount.blob.core.windows.net/container/file.csv';
const sharedKeyAuth = {
  accountName: 'testaccount',
  accountKey: 'XX/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXX+XXXXXXXXX==',
};

describe('createBlobClient', () => {
  test('returns BlobClient with shared key auth', () => {
    const client = createBlobClient(BLOB_URL, sharedKeyAuth);
    expect(client).toBeInstanceOf(BlobClient);
  });

  test('throws on invalid auth', () => {
    expect(() => createBlobClient(BLOB_URL, { connectionString: 'foo' })).toThrow(
      'Invalid authentication configuration',
    );
  });
});
