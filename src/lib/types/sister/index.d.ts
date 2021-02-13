// https://github.com/gajus/sister/blob/master/src/sister.js

declare module 'sister' {
  interface Listener {
    name: string,
    handler: VoidFunction
  }

  export class Sister {
    on(name: string, handler: VoidFunction): Listener
    off(listener: Listener): void
    trigger(name: string, object: Object): void
  }
}