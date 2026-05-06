import { TokenCredential } from '@azure/core-auth';

interface SharedKeyAuth {
  accountName: string;
  accountKey: string;
}

interface ConnectionStringAuth {
  connectionString: string;
}

interface TokenCredentialAuth {
  accountName: string;
  credential: TokenCredential;
}

export type BlobServiceAuth = SharedKeyAuth | ConnectionStringAuth | TokenCredentialAuth;
