import { BlobServiceClient } from '@azure/storage-blob';
import { BlobServiceAuth } from './types';
import { buildUrl } from './helpers';
import { getStorageSharedKeyCredential } from './auth';

export function createBlobServiceClient(auth: BlobServiceAuth): BlobServiceClient {
  if ('accountName' in auth && 'accountKey' in auth) {
    return new BlobServiceClient(
      buildUrl(auth.accountName),
      getStorageSharedKeyCredential(auth.accountName, auth.accountKey),
    );
  }

  throw new Error('Invalid authentication configuration');
}
