class ErrorHandler extends Error {
  private _status: number;

  public constructor(status: number, message: string) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

export default ErrorHandler;
