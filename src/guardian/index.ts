/**
 * Aegis Guardian - The Safety Layer
 * Prevents unauthorized drain, excessive slippage, or malicious CPI calls in real-time.
 */

import type { GuardianConfig } from '../types';

export class Guardian {
  private config: GuardianConfig;

  constructor(config: GuardianConfig) {
    this.config = config;
  }

  public getConfig(): GuardianConfig {
    return this.config;
  }

  // Placeholder for guardian logic
  public validate(): boolean {
    return true;
  }
}

export type { GuardianConfig };
