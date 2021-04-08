import crypto from 'crypto';
const sk = 'asioio23j2fnksdklf!@#%%^^d';

function cryptoUser (user: string) {
    // @ts-ignore
    return crypto.createHmac('sha1', sk).update(user).digest('hex');
}

export {cryptoUser};
