declare function getUserData(tid: string): Promise<any>;
declare function idFormatToNumber(id: any): number;
declare function idListFormatToNumber(idList: Array<any>): number[];
export { getUserData, idListFormatToNumber, idFormatToNumber, };
