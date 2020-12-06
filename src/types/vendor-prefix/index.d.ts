declare module 'vendor-prefix' {
  function get(key: string): string

  function dash(key: string): string

  export = get
}