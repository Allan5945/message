import React, {useImperativeHandle, useEffect} from 'react';
import {Drawer} from 'antd';
import {useCallbackState} from '../../../../public/utils/hooks/useCallbackState';
// eslint-disable-next-line import/extensions
import style from '../../css/navigationMenu.scss';
import FindStep from './findStep';
import {FindFriendsOrGroup, FindFriendsInformation} from './findFriends';
import { FindGroupInformation, CreateFindGroup} from './findGroup';
import { ApplySuccess, CreateSuccess} from './findSuc';
import {useSubscribe, useUnsubscribe} from '../../../../public/utils/hooks/usePubSub';

function FindContainer ({cRef}: any) {
    useImperativeHandle(cRef, () => ({
        openFindContainer: () => {
            setVisibleContainer(true);
        },
    }));
    const unsubscribe = useUnsubscribe();

    const [step, setStep] = useCallbackState(null);
    const [fMes, setFMes] = useCallbackState(null);

    const closeFindContainer = () => {
        setVisibleContainer(null, function () {
            setTimeout(() => {
                setStep(false);
            }, 500);
        });
    };

    const [visibleContainer, setVisibleContainer] = useCallbackState(false);

    const addFriend603 = useSubscribe('addFriend603', (msg: string) => {
        setVisibleContainer(true);
        setStep(603);
    });
    useEffect(() => () => {
        unsubscribe(addFriend603);
    }, [addFriend603]);

    const stepComponent = (num: number) => {
        switch (num) {
            case 1:
                return <FindFriendsOrGroup setStep={setStep} setFMes={setFMes}/>;
            case 2:
                return <FindFriendsInformation setStep={setStep} fMes={fMes}/>;
            case 102:
                return <FindGroupInformation setStep={setStep}/>;
            case 201:
                return <CreateFindGroup setStep={setStep}/>;
            case 603:
                return <ApplySuccess closeFindContainer={closeFindContainer}/>;
            case 604:
                return <CreateSuccess closeFindContainer={closeFindContainer}/>;
            default:
                return <FindStep setStep={setStep}/>;
        }
    };

    return (
        <Drawer
            placement={'top'}
            destroyOnClose
            closable={false}
            visible={visibleContainer}
            height={430}
            onClose={closeFindContainer}
            className={style['nm-box-drawer']}
        >
            {
                stepComponent(step)
            }
        </Drawer>
    );
}

export default FindContainer;

