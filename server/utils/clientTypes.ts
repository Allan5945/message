export enum ClientType {
    phone = '0',
    client = '1',
    browser = '2',
    other = '3',
}

export function getClientType (t: string): ClientType {
    console.log(t)
    switch (t) {
        case '0':
            return ClientType.phone;
        case '1':
            return ClientType.client;
        case '2':
            return ClientType.browser;
        default:
            return ClientType.other;
    }
}

export function getClientName (t: string | ClientType): string {
    switch (t) {
        case '0':
            return 'phone';
        case '1':
            return 'client';
        case '2':
            return 'browser';
        default:
            return 'other';
    }
}
