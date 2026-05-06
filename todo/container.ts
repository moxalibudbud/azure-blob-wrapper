
import { BlobClient, BlobItem, BlobServiceClient, ContainerClient, FilterBlobItem } from '@azure/storage-blob';
import { serviceClient } from './service-client';
import { AzureBlobContainers } from './enums';

export class Container {
  
  serviceClient: BlobServiceClient = serviceClient();
  containerClient: ContainerClient;

  constructor(containerName: string) {
    this.containerClient = this.serviceClient.getContainerClient(containerName);
  }

  listBlobsFlat() {
    return this.containerClient.listBlobsFlat();
  }

  listByTag(query: string) {
    return this.containerClient.findBlobsByTags(query);
  }

  createBlobClients(blobs: BlobItem[] | FilterBlobItem[]): BlobClient[] {
    return blobs.map( blob => this.containerClient.getBlobClient(blob.name));
  }

  blobClient(blobName: string): BlobClient {
    return this.containerClient.getBlobClient(blobName);
  }
}