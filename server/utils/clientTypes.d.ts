export declare enum ClientType {
    phone = "0",
    client = "1",
    browser = "2",
    other = "3"
}
export declare function getClientType(t: string): ClientType;
export declare function getClientName(t: string | ClientType): string;
