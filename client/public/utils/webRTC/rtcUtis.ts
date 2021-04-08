/**
* @desc 获取声音
*/
async function getVoiceStream () {
    let voiceStream;
    try {
        voiceStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    } catch {
        return;
    }
    return voiceStream;
}

export {
    getVoiceStream,
};
