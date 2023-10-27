import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

class Token {
    private _secret = process.env.JWT_SECRET || 'tGI$6wEi:.WL';
    private _config: jwt.SignOptions = {
        expiresIn: '8h',
        algorithm: 'HS256',
    };

    public generate(data: any) {
        return jwt.sign({ data }, this._secret, this._config);
    }

    public async validate(token: string): Promise<any> {
        return jwt.verify(token, this._secret);
    }
}

export default Token;