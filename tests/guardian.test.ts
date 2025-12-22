import { describe, it, expect } from 'vitest';
import { Guardian } from '../src/guardian';

describe('Guardian', () => {
  it('should create guardian with config', () => {
    const guardian = new Guardian({
      maxSlippage: 0.5,
      emergencyStop: true,
    });

    expect(guardian).toBeDefined();
    expect(guardian.getConfig()).toEqual({
      maxSlippage: 0.5,
      emergencyStop: true,
    });
  });

  it('should validate transactions', () => {
    const guardian = new Guardian({
      maxSlippage: 0.5,
      emergencyStop: true,
    });

    expect(guardian.validate()).toBe(true);
  });
});
