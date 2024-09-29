import { error } from 'console';
import e from 'express';
import { sign, verify, Secret, SignOptions, JsonWebTokenError } from 'jsonwebtoken';
import { exit } from 'process';

const secretKey : Secret = 'yourSecretKey';

export function generateToken (payload: string | Buffer | object) : string | null
{
    const options : SignOptions = {
        expiresIn: '1h',
    };

    try{
        const token = sign(payload, secretKey, options);
        return token;
    }
    catch(e)
    {
        console.log(e);
    }

    return null;    
}


export function verifyToken (token: string) : string | null
 {
    let result = null;
    try {
        const payload : any = verify(token, secretKey);
        if (!('name' in payload ) || !('username' in payload.name)) {
            throw error('Bad formatting of payload acccess_token');
        }
        
        result = payload.name.username;
    }
    catch(e)
    {
        if (e instanceof JsonWebTokenError) {
            result = null;
        } else console.log(e);      
    }
    finally {
        return result;
    }
    
}
