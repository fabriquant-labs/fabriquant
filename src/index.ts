/**
 * @fabriquant/sdk - The Precision Execution Stack for Solana
 *
 * Engineered for Parallelism. Built for Autonomy. Woven for Speed.
 *
 * A unified development stack designed to master Solana's Sealevel runtime,
 * providing high-performance tools and safety frameworks for AI Agents and
 * DeFi protocols to execute complex transactions with absolute precision.
 *
 * @packageDocumentation
 * @module @fabriquant/sdk
 */

/**
 * Main orchestration class for executing transactions with Guard validation
 * and privacy support.
 *
 * @example
 * ```typescript
 * import { Fabriquant, Guard } from "@fabriquant/sdk";
 *
 * const guard = new Guard({ maxSlippage: 0.1, mode: "block" });
 * await Fabriquant.execute(transaction, { with: guard });
 * ```
 */
export { Fabriquant } from "./core/fabriquant";

/**
 * Security layer for transaction validation and protection.
 *
 * Provides real-time monitoring and enforcement of security rules to prevent
 * unauthorized drains, excessive slippage, malicious CPI calls, and reentrancy attacks.
 *
 * @example
 * ```typescript
 * import { Guard } from "@fabriquant/sdk";
 *
 * const guard = new Guard({
 *   maxSlippage: 0.1,
 *   riskTolerance: "moderate",
 *   mode: "block"
 * });
 * const result = guard.validateTransaction(tx);
 * ```
 */
export { Guard, PatternId, Severity } from "./guard";

/**
 * High-velocity liquidity engine for optimized transaction routing.
 *
 * Structures state management and transaction bundling to eliminate lock contention
 * and maximize throughput across multiple DEXs.
 *
 * @example
 * ```typescript
 * import { Loom } from "@fabriquant/sdk";
 *
 * const tx = await Loom.weave({
 *   type: "MULTI_ROUTE_SWAP",
 *   input: "SOL",
 *   output: "USDC",
 *   amount: 100,
 *   parallelPriority: true
 * });
 * ```
 */
export { Loom } from "./loom";

/**
 * Performance and privacy layer for transaction optimization.
 *
 * Provides parallel execution optimization and ZK Compression support for
 * shielded, cost-efficient transaction execution.
 *
 * @example
 * ```typescript
 * import { FabricCore } from "@fabriquant/sdk";
 *
 * const optimized = FabricCore.optimize(tx, {
 *   enablePrivacy: true,
 *   compressionLevel: "high",
 *   privacyProvider: "arbor"
 * });
 *
 * const savings = FabricCore.estimateCompressionSavings(1000);
 * ```
 */
export { FabricCore } from "./fabric";

/**
 * AI-driven risk assessment gateway for RWA validation and asset integrity.
 *
 * Provides real-time risk scoring, compliance checks, and oracle integrity
 * monitoring with intelligent caching.
 *
 * Note: Class exported as "Pulsar" for backward compatibility but represents
 * the Risk component.
 *
 * @example
 * ```typescript
 * import { Pulsar } from "@fabriquant/sdk";
 *
 * const pulsar = new Pulsar({
 *   apiKey: "your-api-key",
 *   environment: "mainnet",
 *   cacheTTL: 60000
 * });
 *
 * const risk = await pulsar.assessRisk("asset-address");
 * ```
 */
export { Pulsar } from "./pulsar";

/**
 * Configuration and type definitions for the Fabriquant SDK.
 *
 * Includes interfaces for Guard, Risk (Pulsar), Privacy, Loom, transactions,
 * and validation results.
 */
export type {
    /** Configuration for the main Fabriquant orchestrator */
    FabriquantConfig,
    /** Configuration for the Guard security layer */
    GuardConfig,
    /** Configuration for the Loom liquidity engine */
    LoomConfig,
    /** Transaction structure with instructions and metadata */
    Transaction,
    /** Security warning detected by Guard pattern detection */
    SecurityWarning,
    /** Result of transaction validation by Guard */
    ValidationResult,
    /** Individual validation rule definition */
    ValidationRule,
    /** Individual transaction instruction */
    TransactionInstruction,
    /** Risk metrics from Pulsar risk assessment */
    RiskMetrics,
    /** Configuration for Pulsar (Risk) integration */
    PulsarConfig,
    /** Configuration for Privacy (Arbor) integration */
    PrivacyConfig,
} from "./types";
