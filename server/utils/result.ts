enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}

export enum Code{
    '00000' = '00000', // 一切正常
    'A0001' = 'A0001', //
    'A0400' = 'A0400',
}
interface ResultData {
    success: boolean,
    result: any,
    statusCode: any,
}


class Result {
    static success (data ? : any, code ? : Code) {
        let resData: ResultData = {
            success: true,
            result: null,
            statusCode: Code['00000'],
        };
        if (code) {
            resData.statusCode = code;
        }
        if (data) {
            resData.result = data;
        }
        return resData;
    }

    static fail (data ? : any, code ? : Code) {
        let resData: ResultData = {
            success: false,
            result: null,
            statusCode: Code['A0001'],
        };
        if (code) {
            resData.statusCode = code;
        }
        if (data) {
            resData.result = data;
        }
        return resData;
    }
}

export {Result};


