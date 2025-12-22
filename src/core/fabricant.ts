/**
 * Core Fabricant class for executing protected transactions
 */

import type { FabricantConfig, Transaction } from '../types';
import type { Guardian } from '../guardian';

export class Fabricant {
  private config: FabricantConfig;

  constructor(config: FabricantConfig = {}) {
    this.config = {
      network: config.network || 'mainnet-beta',
      rpcUrl: config.rpcUrl,
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public static async execute(
    tx: Transaction,
    options: { guardian?: Guardian } = {}
  ): Promise<Transaction> {
    // Validate with guardian if provided
    if (options.guardian) {
      const isValid = options.guardian.validate();
      if (!isValid) {
        return { ...tx, status: 'failed' };
      }
    }

    // Placeholder execution logic
    return { ...tx, status: 'executed' };
  }

  public getConfig(): FabricantConfig {
    return this.config;
  }
}
