/**
 * Enhanced stub for the 'eventemitter2' package.
 * Provides a more complete EventEmitter2 implementation to prevent runtime errors.
 */

export class EventEmitter2 {
  private events: Map<string | symbol, Function[]> = new Map()

  on(event: string | symbol, listener: (...args: any[]) => void): this {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(listener)
    return this
  }

  once(event: string | symbol, listener: (...args: any[]) => void): this {
    const onceWrapper = (...args: any[]) => {
      this.off(event, onceWrapper)
      listener(...args)
    }
    return this.on(event, onceWrapper)
  }

  off(event: string | symbol, listener: (...args: any[]) => void): this {
    const listeners = this.events.get(event)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
    return this
  }

  emit(event: string | symbol, ...args: any[]): boolean {
    const listeners = this.events.get(event)
    if (listeners && listeners.length > 0) {
      listeners.forEach((listener) => {
        try {
          listener(...args)
        } catch (error) {
          console.error("EventEmitter2 error:", error)
        }
      })
      return true
    }
    return false
  }

  removeAllListeners(event?: string | symbol): this {
    if (event) {
      this.events.delete(event)
    } else {
      this.events.clear()
    }
    return this
  }

  listenerCount(event: string | symbol): number {
    return this.events.get(event)?.length || 0
  }

  listeners(event: string | symbol): Function[] {
    return this.events.get(event) || []
  }
}

export default EventEmitter2

// Additional exports that might be expected
export const EventEmitter = EventEmitter2
