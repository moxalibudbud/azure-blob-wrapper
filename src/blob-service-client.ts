import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { BlobServiceAuth } from '../todo/types';

export function createServiceClient(auth: BlobServiceAuth): BlobServiceClient {
  return createBlobServiceClient(auth);
}

function buildUrl(accountName: string): string {
  return `https://${accountName}.blob.core.windows.net`;
}

function createBlobServiceClient(auth: BlobServiceAuth): BlobServiceClient {
  switch (auth.type) {
    case 'sharedKey':
      return new BlobServiceClient(
        buildUrl(auth.accountName),
        new StorageSharedKeyCredential(auth.accountName, auth.accountKey)
      );

    case 'connectionString':
      return BlobServiceClient.fromConnectionString(auth.connectionString);

    case 'tokenCredential':
      return new BlobServiceClient(buildUrl(auth.accountName), auth.credential);
  }
}
