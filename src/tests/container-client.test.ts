import { test, expect, describe } from '@jest/globals';
import { ContainerClient } from '@azure/storage-blob';
import { createContainerClient } from '../container-client';

const CONTAINER_URL = 'https://testaccount.blob.core.windows.net/mycontainer';
const sharedKeyAuth = {
  accountName: 'testaccount',
  accountKey: 'XX/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXX+XXXXXXXXX==',
};

describe('createContainerClient', () => {
  test('returns ContainerClient with shared key auth', () => {
    const client = createContainerClient(CONTAINER_URL, sharedKeyAuth);
    expect(client).toBeInstanceOf(ContainerClient);
  });

  test('throws on invalid auth', () => {
    expect(() => createContainerClient(CONTAINER_URL, { connectionString: 'foo' })).toThrow(
      'Invalid authentication configuration',
    );
  });
});
