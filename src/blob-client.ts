import { BlobClient } from '@azure/storage-blob';
import { BlobServiceAuth } from './types';
import { getStorageSharedKeyCredential } from './auth';

export function createBlobClient(blobUrl: string, auth: BlobServiceAuth): BlobClient {
  if ('accountName' in auth && 'accountKey' in auth) {
    return new BlobClient(blobUrl, getStorageSharedKeyCredential(auth.accountName, auth.accountKey));
  }
  throw new Error('Invalid authentication configuration');
}
