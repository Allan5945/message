import React, {useReducer} from 'react';

const [count, dispath] = useReducer((state: any, action: any) => state + 1, 0);

export {
    count,
    dispath
};
