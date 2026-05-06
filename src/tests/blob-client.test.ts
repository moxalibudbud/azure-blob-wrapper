import { beforeAll, test, expect, describe } from '@jest/globals';
import { BlobClient } from '@azure/storage-blob';

describe('Blob tests', () => {
  beforeAll(() => {
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME = 'testaccount';
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY =
      'XX/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXX+XXXXXXXXX==';
  });

  test('blob.blobClient must instance of BlobClient', async () => {
    const { createBlobClient } = await import('../blob-client');
    const blobClient = createBlobClient('https://storageaccount.blob.core.windows.net/container/file.csv');
    expect(blobClient).toBeInstanceOf(BlobClient);
  });
});
