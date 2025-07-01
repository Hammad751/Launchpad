/**
 * Minimal stub for the `eventemitter2` package.
 * It satisfies the named export `{ EventEmitter2 }`
 * without pulling the real (Node-only) implementation.
 */

export class EventEmitter2 {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(_event: string | symbol, _listener: (...args: any[]) => void) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  once(_event: string | symbol, _listener: (...args: any[]) => void) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(_event: string | symbol, _listener: (...args: any[]) => void) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(_event: string | symbol, ..._args: any[]) {
    return false
  }
}

export default EventEmitter2
