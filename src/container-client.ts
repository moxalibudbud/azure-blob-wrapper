import { ContainerClient } from '@azure/storage-blob';
import { BlobServiceAuth } from './types';
import { getStorageSharedKeyCredential } from './auth';

export function createContainerClient(container: string, auth: BlobServiceAuth): ContainerClient {
  if ('accountName' in auth && 'accountKey' in auth) {
    return new ContainerClient(container, getStorageSharedKeyCredential(auth.accountName, auth.accountKey));
  }
  throw new Error('Invalid authentication configuration');
}
