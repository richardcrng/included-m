declare module 'seedrandom' {

  function sr(
    seed: string | number,
    options?: { entropy?: boolean, global?: boolean }
  ): () => number

  export = sr
}