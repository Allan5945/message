export declare enum Code {
    '00000' = "00000",
    'A0001' = "A0001",
    'A0400' = "A0400"
}
interface ResultData {
    success: boolean;
    result: any;
    statusCode: any;
}
declare class Result {
    static success(data?: any, code?: Code): ResultData;
    static fail(data?: any, code?: Code): ResultData;
}
export { Result };
