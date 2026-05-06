import { BlockBlobClient, StorageSharedKeyCredential } from '@azure/storage-blob';

export function createBlockBlobClient(blobUrl: string): BlockBlobClient {
  const credentials = new StorageSharedKeyCredential(
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME as string,
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY as string
  );
  return new BlockBlobClient(blobUrl, credentials);
}
