import { BlobClient, StorageSharedKeyCredential } from '@azure/storage-blob';

export function createBlobClient(blobUrl: string): BlobClient {
  const credentials = new StorageSharedKeyCredential(
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME as string,
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY as string
  );
  return new BlobClient(blobUrl, credentials);
}
