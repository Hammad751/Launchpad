/**
 * Comprehensive stub for the optional 'pino-pretty' dependency.
 * This prevents build failures when pino tries to import pino-pretty.
 */

// Main export - the pretty printer function
export default function pinoPretty(options?: any): any {
  return (obj: any) => {
    // Simple fallback formatting
    if (typeof obj === "object" && obj !== null) {
      return JSON.stringify(obj, null, 2)
    }
    return String(obj)
  }
}

// Named exports that might be used
export const prettyFactory = pinoPretty
export const colorizerFactory = () => (str: string) => str
export const levelColorize = (level: string) => level
export const messageColorize = (message: string) => message
