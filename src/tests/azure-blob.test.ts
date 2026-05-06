import { test, expect, describe, beforeEach } from '@jest/globals';
import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { AzureBlobContainers } from '../../todo/enums';

describe('Azure Blob Storage library tests', () => {
  let ServiceClientModule: any;

  beforeEach(async () => {
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME = 'testaccount';
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY = 'xJ/JhgA6Fq000x06IvHPZ47j7v00000/Y7XGDEHO8ra1ZCMXNkf2CkLPjZ36hQR80sHA1xZ/FpOA+AStP9bJXX==';

    ServiceClientModule = await import('../../todo/service-client');
  });
  
  test('Service Client should pass with arguments', () => {
    const { serviceClient } = ServiceClientModule;
    const AZURE_BLOB_STORAGE_ACCOUNT_NAME = process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME as string;
    const AZURE_BLOB_STORAGE_ACCOUNT_KEY = process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY as string;
    const credentials = {
      credentials: new StorageSharedKeyCredential(AZURE_BLOB_STORAGE_ACCOUNT_NAME, AZURE_BLOB_STORAGE_ACCOUNT_KEY),
      accountName: AZURE_BLOB_STORAGE_ACCOUNT_NAME,
    };

    const client = serviceClient(credentials)
    expect(client).toBeInstanceOf(BlobServiceClient);
  });

  test('Service Client should pass without arguments', () => {
    const { serviceClient } = ServiceClientModule;
    const client = serviceClient();
    expect(client).toBeInstanceOf(BlobServiceClient);
  });

  test('Container object should pass correct property instances ', async () => {
    const { Container } = await import('../../todo/container');
    const containerClient = new Container(AzureBlobContainers.SIOCS_SOH);
    expect(containerClient.serviceClient).toBeInstanceOf(BlobServiceClient);
    expect(containerClient.containerClient).toBeInstanceOf(ContainerClient);
  });
});