import { TokenCredential } from '@azure/core-auth';

interface SharedKeyAuth {
  type: 'sharedKey';
  accountName: string;
  accountKey: string;
}

interface ConnectionStringAuth {
  type: 'connectionString';
  connectionString: string;
}

interface TokenCredentialAuth {
  type: 'tokenCredential';
  accountName: string;
  credential: TokenCredential;
}

export type BlobServiceAuth = SharedKeyAuth | ConnectionStringAuth | TokenCredentialAuth;