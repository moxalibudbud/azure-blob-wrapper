
import { BlobClient, ContainerClient } from '@azure/storage-blob';

export class Blob {
  
  blobClient: BlobClient;

  constructor(blobName: string, containerClient: ContainerClient) {
    this.blobClient = containerClient.getBlobClient(blobName);
  }

  async delete() {
    const response = await this.blobClient.delete({
      deleteSnapshots: 'include'
    });
    return response;
  }
}