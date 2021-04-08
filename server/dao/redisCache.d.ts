import { ClientType } from '../utils/clientTypes';
declare function addUser(userName: string, token: string, clientType: ClientType, u: string, id: number): string;
declare function removeUser(uuid: string): void;
declare function getUser(tid: string): any;
export { addUser, removeUser, getUser };
