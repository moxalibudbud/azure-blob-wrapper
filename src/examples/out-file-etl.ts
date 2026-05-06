import { BlobLineReader } from '../../todo/blob-line-reader';

export class OutFileETL extends BlobLineReader {

  constructor(filepath: string) {
    super(filepath);
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
    const handleOnLine = (chunk: string) => arr.push(chunk);
    const handleOnClose = (resolve: Function) => resolve(arr);

    return this.readlineInterfacePromise(handleOnLine, handleOnClose);
  }
}