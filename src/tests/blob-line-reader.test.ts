import { test, expect, describe, jest, beforeAll, beforeEach } from '@jest/globals';
import readline from 'readline';
import { Readable } from 'stream'; 

const BLOB_URL = 'https://alshayastaging.blob.core.windows.net/wip/item-master.csv';

describe('Azure Blob Line Reader tests', () => {
  let mockReader: any;

  beforeEach(async () => {
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME = 'testaccount';
    process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY = 'xJ/JhgA6Fq000x06IvHPZ47j7v00000/Y7XGDEHO8ra1ZCMXNkf2CkLPjZ36hQR80sHA1xZ/FpOA+AStP9bJXX==';
  
    const { BlobLineReader } = await import('../../todo/blob-line-reader');
  
    class MockReader extends BlobLineReader {
      constructor() {
        super(BLOB_URL);
      }
    
      async readContent() {
        try {
          const data = await this.readBlob();
          return data;
        } catch (error) {
          throw error;
        }
      }
    
      async readBlob() {
        const arr: string[] = [];
        const handleOnLine = (chunk: string) => {
          arr.push(chunk);
        };
        const handleOnClose = (resolve: Function) => resolve(arr);
    
        return this.readlineInterfacePromise(handleOnLine, handleOnClose);
      }
    }


    mockReader = new MockReader();
  });


  test('getters should pass', () => {
    expect(mockReader.extension).toBe('csv');
    expect(mockReader.filename).toBe('item-master.csv');
  });

  test('readlineInterface property must be undefined', () => {
    expect(mockReader.readlineInterface).toBe(undefined);
  });

  test('readlineInterface should pass', async () => {
    const reader = mockReader;

    // Mock getReadableSteream
    const mockStream = new Readable();
    mockStream.push('line1\nline2\nline3\n'); 
    mockStream.push(null);
    jest.spyOn(reader, 'getReadableStream').mockResolvedValue(mockStream);

    await reader.createReadlineInterface();
    reader.cleanUpPreviousListeners();

    reader.readlineInterface?.on('close', () => {
      reader.readlineInterface?.close();
    });
    
    expect(reader.readlineInterface).toBeInstanceOf(readline.Interface);
  });

  test('readlineInterface should call removeAllListeners on initialization and close on end of input stream', async () => {
    const reader = mockReader;
    
    // Mock getReadableSteream
    const mockStream = new Readable();
    mockStream.push('line1\nline2\nline3\n'); 
    mockStream.push(null);
    jest.spyOn(reader, 'getReadableStream').mockResolvedValue(mockStream);

    // Explicitly invoke createReadlineInterface
    // readlineInterface will be created and ready to spy.
    await reader.createReadlineInterface();

    const spyClose = jest.spyOn(reader.readlineInterface!, 'close');
    const spyRemoveAllListeners = jest.spyOn(reader.readlineInterface!, 'removeAllListeners');

    const result = await reader.readBlob();
    expect(spyClose).toHaveBeenCalled();
    expect(spyRemoveAllListeners).toHaveBeenCalled();
    expect(result).toEqual(expect.arrayContaining([ 'line1', 'line2', 'line3' ]));
  });
});