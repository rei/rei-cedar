import { debounce } from '../debounce';
import { vi } from 'vitest';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cancels previous calls when invoked multiple times', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    vi.advanceTimersByTime(100);
    debounced();
    vi.advanceTimersByTime(100);
    debounced();
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to the callback', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 200);

    debounced('arg1', 'arg2', 123);
    vi.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });

  it('uses custom delay time', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);

    debounced();
    vi.advanceTimersByTime(499);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('uses default delay when not specified', () => {
    const callback = vi.fn();
    const debounced = debounce(callback);

    debounced();
    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('preserves context (this)', () => {
    const context = { value: 42 };
    const callback = vi.fn(function (this: typeof context) {
      return this.value;
    });
    const debounced = debounce(callback, 100);

    debounced.call(context);
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalled();
  });
});
