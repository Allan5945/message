import * as React from 'react';
import * as ReactDOM from 'react-dom';

// @ts-ignore
import * as loadable from '@loadable/component';
const Index = loadable['default'](() => import('./index'));


loadable.loadableReady(() => {
    ReactDOM.render(
        <>
            <Index/>
        </>,
        document.getElementById('root')
    );
});
