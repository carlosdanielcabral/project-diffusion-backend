import HttpStatusCode from './HttpStatusCode';

class HttpError extends Error {
    private _status: HttpStatusCode;

    public constructor(status: HttpStatusCode, message: string) {
        super(message);

        this._status = status;
    }

    get status(): HttpStatusCode {
        return this._status;
    }
}

export default HttpError;
