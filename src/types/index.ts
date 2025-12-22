/**
 * Core types for the Aegis Flow SDK
 */

export interface AegisFlowConfig {
  network?: 'mainnet-beta' | 'devnet' | 'testnet';
  rpcUrl?: string;
}

export interface GuardianConfig {
  maxSlippage?: number;
  emergencyStop?: boolean;
}

export interface FlowEngineConfig {
  action: 'SWAP' | 'STAKE' | 'LEND' | 'YIELD';
  pair?: [string, string];
  priority?: 'Low' | 'Medium' | 'High' | 'Ultra';
}

export interface Transaction {
  id: string;
  status: 'pending' | 'executed' | 'failed';
}
