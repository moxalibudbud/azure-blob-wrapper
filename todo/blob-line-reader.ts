import readline from 'readline';
import { File } from 'list-data-reader';
import { createBlobClient } from './blob-client';
import { BlobClient } from '@azure/storage-blob';


export interface ReadlineInterfaceCloseHandler {
  (resolve: Function): void;
}

export interface ReadlineInterfaceErrorHandler {
  (reject: Function): void;
}

export interface ReadlineInterfaceLineHandler {
  (...args: any): void;
}

export abstract class BlobLineReader {

  file: File;
  readlineInterface?: readline.Interface;

  constructor(url: string) {
    this.file = new File(url);
  }

  get url(): string {
    return this.file.filepath;
  }

  get extension(): string {
    return this.file.extension;
  }

  get filename(): string {
    return this.file.filename;
  }

  get sourceBlobClient(): BlobClient {
    return createBlobClient(this.url);
  }

  async getReadableStream() {
    const downloadBlockBlobResponse = await this.sourceBlobClient.download(0);
    return downloadBlockBlobResponse.readableStreamBody;
  }

  async createReadlineInterface() {
    const readableStream = await this.getReadableStream();
    if(!readableStream) return;
    
    this.readlineInterface = readline.createInterface({
      input: readableStream,
      crlfDelay: Infinity,
      terminal: false
    });
  }

  /**
   * Clean up previous listeners if they exist to avoid memory leaks or duplicate event handling
   * @returns void
   */
  cleanUpPreviousListeners(): void {
    if(!this.readlineInterface) return;

    this.readlineInterface.removeAllListeners('line');
    this.readlineInterface.removeAllListeners('close');
  }

  async readlineInterfacePromise(
    onLineHandler: ReadlineInterfaceLineHandler,
    onCloseHandler: ReadlineInterfaceCloseHandler
  ): Promise<any> {
    if(!this.readlineInterface) {
      await this.createReadlineInterface();
    }

    this.cleanUpPreviousListeners();
    
    return new Promise((resolve, reject) => {
      try {
        this.readlineInterface?.on('line', onLineHandler);
        this.readlineInterface?.on('close', () => onCloseHandler(resolve));
      } catch (e) {
        reject(e);
      }
    });
  }
  
  abstract readBlob(): Promise<any> | undefined;
}
