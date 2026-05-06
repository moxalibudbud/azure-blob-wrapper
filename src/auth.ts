import { StorageSharedKeyCredential } from '@azure/storage-blob';

export function getStorageSharedKeyCredential(accountName: string, accountKey: string) {
  return new StorageSharedKeyCredential(accountName, accountKey);
}
