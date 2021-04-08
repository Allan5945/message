import {useEffect, useState, useRef} from 'react';

// @ts-ignore
function useCallbackState (od) {
    const cbRef = useRef();
    const [data, setData] = useState(od);

    useEffect(() => {
        // @ts-ignore
        cbRef.current && cbRef.current(data);
    }, [data]);
    // @ts-ignore
    return [data, function (d, callback) {
        cbRef.current = callback;
        setData(d);
    }];
}

export {useCallbackState};
