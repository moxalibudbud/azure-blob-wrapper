import { BlockBlobClient } from '@azure/storage-blob';
import { BlobServiceAuth } from './types';
import { getStorageSharedKeyCredential } from './auth';

export function createBlockBlobClient(blobUrl: string, auth: BlobServiceAuth): BlockBlobClient {
  if ('accountName' in auth && 'accountKey' in auth) {
    return new BlockBlobClient(blobUrl, getStorageSharedKeyCredential(auth.accountName, auth.accountKey));
  }
  throw new Error('Invalid authentication configuration');
}
