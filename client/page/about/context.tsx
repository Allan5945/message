import React, {createContext} from 'react';

const contextTestOne = {
    name: 'chen',
    length: 22,
};
const WrapContext = createContext(contextTestOne.name);
export default WrapContext;
