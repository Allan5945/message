import path from 'path';
const rootPath = require('app-root-path').path;
import fs from 'fs';
// @ts-ignore
import { v1 as uuidv1 } from 'uuid';
import {updatePh} from '../dao/headPortraitDao';
import {cryptoUser} from '../utils/encryptionUtils';

/**
 * @desc 上传/修改用户头像
 */
function updateHeadPortrait (id: number, ctx: any) {
    return new Promise(function (resolve, reject) {
        try {
            const file = ctx.request.files.file;
            const reader = fs.createReadStream(file.path);
            const fileName = file.name;
            let url = `/img/ph/${cryptoUser(id.toString())}-${uuidv1()}.${fileName.split('.')[1]}`;
            let filePath = path.join(rootPath, 'static/', url);
            const upStream = fs.createWriteStream(filePath);
            reader.pipe(upStream);
            updatePh(url, id).then(() => {
                resolve(resolve({
                    type: 0,
                    mes: '修改成功',
                }));
            }).catch(() => {
                resolve(resolve({
                    type: 1,
                    mes: '修改失败',
                }));
            });
        } catch (e) {
            resolve(resolve({
                type: 1,
                mes: '修改失败',
            }));
        }
    });
}

export {
    updateHeadPortrait,
};
