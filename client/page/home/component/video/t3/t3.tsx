// eslint-disable-next-line import/extensions
import style from '../../../css/videoChat.scss';

const vbx = document.getElementById('video-box');

let dom = `
    <div class='style.container'>
        <div class=${style['video-box']}>
            <video class=${style['remote-video']} id='remote-video' ></video>
            <video class=${style['local-video']} id='local-video' muted ></video>
           <div class=${style['btn-box']}>
                    <p class=${style['btn-title']}>发起视频通话</p>
                    <div class=${style['btn-box-btn']}>
                        <button type="primary" shape="circle" size={'large'} danger class=${style['btn']} >
                            拒绝
                        </button>
                        <button type="primary" shape="circle" size={'large'} class=${style['btn']} >
                            同意
                        </button>
                    </div>
                </div>
            <div class=${style['btn-box']}>
                    <p class=${style['btn-title']}>呼叫中...</p>
                    <div class=${style['btn-box-btn']}>
                        <button type="primary" shape="circle" size={'large'} danger class=${style['btn']}>
                            取消
                        </button>
                    </div>
                </div>
                   <div class=${style['btn-box']}>
                    <p class=${style['btn-title']}>呼叫中...</p>
                    <div class=${style['btn-box-btn']}>
                        <button type="primary" shape="circle" size={'large'} danger class=${style['btn']} >
                            取消
                        </button>
                    </div>
                </div>
        </div>
    </div>
`;
console.log(vbx);


vbx.innerHTML = dom;

