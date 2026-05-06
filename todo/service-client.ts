import { BlobClient, BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

export interface ServiceClientCredentials {
  credentials: StorageSharedKeyCredential;
  accountName: string;
}

export function getDefaultOptions(): ServiceClientCredentials {
  const options = {
    credentials: new StorageSharedKeyCredential(
      process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME as string,
      process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY as string
    ),
    accountName: process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME as string
  };

  return options;
}

function buildBlobServiceClient(options: ServiceClientCredentials) {
  return new BlobServiceClient(
    `https://${options.accountName}.blob.core.windows.net`,
    options.credentials
  );
}

function buildBlobClient(blobUrl: string, options: ServiceClientCredentials) {
  return new BlobClient(
    blobUrl,
    options.credentials
  );
}

export function serviceClient(options?: ServiceClientCredentials): BlobServiceClient {
  const serviceClient = buildBlobServiceClient(options ? options : getDefaultOptions());
  return serviceClient;
}