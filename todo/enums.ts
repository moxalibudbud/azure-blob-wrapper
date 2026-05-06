export enum AzureBlobContainers {
  DATASCAN_ITEM_MASTER = 'datascan-item-master',
  DATASCAN_COUNT_FILE = 'datascan-count-files',
  DATASCAN_SOH = 'datascan-soh',
  GOLD_ITEM_MASTER = 'gold-item-master',
  GOLD_COUNT_FILE = 'gold-count-files',
  GOLD_SOH = 'gold-soh',
  RMS_ITEM_MASTER = 'rms-item-master',
  RMS_COUNT_FILE = 'rms-count-files',
  RMS_SOH = 'rms-soh',
  SIOCS_ITEM_MASTER = 'siocs-item-master',
  SIOCS_COUNT_FILE = 'siocs-count-files',
  SIOCS_SOH = 'siocs-soh',
  WIP = 'wip'
}

export enum WIPContainerStatus {
  TO_PROCESS = 'to_process',
  WAITING_TO_PROCESS = 'waiting_to_process',
  WIP = 'wip',
  VALIDATED = 'validated',
  REJECTED = 'rejected'
}

export enum FileGeneratedStatus {
  GENERATED = '1',
  NOT_GENERATED = '0',
  LOCALLY = '2'
}

export enum DatascanSentStatus {
  TRUE = '1',
  FALSE = '0'
}