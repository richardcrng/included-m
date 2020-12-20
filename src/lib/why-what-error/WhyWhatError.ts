interface WhyWhat {
  /**
   * **What** operation/update failed
   */
  what: string;

  /**
   * **Why** the operation/update failed
   */
  why: string;
}

class WhyWhatError extends Error {
  message: string;

  /**
   * **What** operation/update failed
   */
  what: string;

  /**
   * **Why** the operation/update failed
   */
  why?: string;

  /**
   *
   * @param param0.what - What operation failed
   * @param param0.why - Why the operation failed
   */
  constructor(
    { what = "Operation failed", why }: Partial<WhyWhat>,
    errorName?: string
  ) {
    const message = why ? [what, why].join(". ") : what;
    super(message);
    this.message = message;
    this.name = errorName || "WhyWhatError";
    this.what = what;
    this.why = why;
  }

  static from(err: Error, details: Partial<WhyWhat>) {
    const why = err instanceof WhyWhatError ? err.why : err.message;

    return new WhyWhatError({ why, ...details });
  }
}

export default WhyWhatError;
