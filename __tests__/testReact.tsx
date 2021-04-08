import React, {memo, useEffect, useState, Profiler, Suspense, lazy, createContext, Component, useCallback, useLayoutEffect} from 'react';


function Parent () {
    return (
        <div onClick={() => {console.log(4);}}>
            <div className={'asas'}>55</div>
        </div>
    );
}

export default Parent;
