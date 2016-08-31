

class AudioContext_ {
    private static _audioContext: AudioContext;
    public static getContext(): AudioContext {
        if (!this._audioContext) {
            this._audioContext = new (window["AudioContext"] || window["webkitAudioContext"])();
        }
        return this._audioContext;
    }
};

export { AudioContext_ };