import { test, expect, describe } from '@jest/globals';
import { BlockBlobClient } from '@azure/storage-blob';

const auth = {
  accountName: 'testaccount',
  accountKey: 'XX/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXX+XXXXXXXXX==',
};

describe('Blob tests', () => {
  test('blob.blobClient must instance of BlobClient', async () => {
    const { createBlockBlobClient } = await import('../block-blob-client');
    const blobClient = createBlockBlobClient('https://storageaccount.blob.core.windows.net/container/file.csv', auth);
    expect(blobClient).toBeInstanceOf(BlockBlobClient);
  });
});
