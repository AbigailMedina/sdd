import TimerState, { INITED, PLAYING, PAUSED, STOPPED } from './TimerState';
describe('#TimerState', function () {
    it('should set INITED state in constructor', function () {
        var state = new TimerState();
        expect(state.getState()).toEqual(INITED);
    });
    it('should return false when set INITED from INITED', function () {
        var state = new TimerState();
        expect(state.setInited()).toEqual(false);
    });
    it('should return true when set INITED from PLAYING', function () {
        var state = new TimerState();
        state.setPlaying();
        expect(state.setInited()).toEqual(true);
    });
    it('should return false when set PLAYING from PLAYING', function () {
        var state = new TimerState();
        state.setPlaying();
        expect(state.setPlaying()).toEqual(false);
    });
    it('should return true when set PLAYING from INITED', function () {
        var state = new TimerState();
        expect(state.setPlaying()).toEqual(true);
    });
    it('should return true when set PAUSED from PLAYING', function () {
        var state = new TimerState();
        state.setPlaying();
        expect(state.setPaused()).toEqual(true);
    });
    it('should return false when set INITED from PAUSED', function () {
        var state = new TimerState();
        expect(state.setPaused()).toEqual(false);
    });
    it('should return false when set STOPPED from INITED', function () {
        var state = new TimerState();
        expect(state.setStopped()).toEqual(false);
    });
    it('should return true when set PLAYING from STOPPED', function () {
        var state = new TimerState();
        state.setPlaying();
        expect(state.setStopped()).toEqual(true);
    });
    it('should set PLAYING state', function () {
        var state = new TimerState();
        state.setPlaying();
        expect(state.getState()).toEqual(PLAYING);
    });
    it('should set INITED state', function () {
        var state = new TimerState();
        state.setPlaying();
        state.setInited();
        expect(state.getState()).toEqual(INITED);
    });
    it('should not set PAUSED state when not in PLAYING', function () {
        var state = new TimerState();
        state.setPaused();
        expect(state.getState()).not.toEqual(PAUSED);
        expect(state.getState()).toEqual(INITED);
    });
    it('should set PAUSED state when in PLAYING', function () {
        var state = new TimerState();
        state.setPlaying();
        state.setPaused();
        expect(state.getState()).toEqual(PAUSED);
    });
    it('should not set STOPPED state when in INITED', function () {
        var state = new TimerState();
        state.setStopped();
        expect(state.getState()).not.toEqual(STOPPED);
        expect(state.getState()).toEqual(INITED);
    });
    it('should set STOPPED state when not in INITED', function () {
        var state = new TimerState();
        state.setPlaying();
        state.setStopped();
        expect(state.getState()).toEqual(STOPPED);
    });
    it('should call onChange handler with INITED timer state on setInited', function () {
        var mockCallback = jest.fn(function (_a) {
            var timerState = _a.timerState;
            return timerState;
        });
        var state = new TimerState(mockCallback);
        state.setPlaying();
        state.setInited();
        expect(mockCallback.mock.results[1].value).toEqual(INITED);
    });
    it('should call onChange handler with PLAYING timer state on setPlaying', function () {
        var mockCallback = jest.fn(function (_a) {
            var timerState = _a.timerState;
            return timerState;
        });
        var state = new TimerState(mockCallback);
        state.setPlaying();
        expect(mockCallback.mock.results[0].value).toEqual(PLAYING);
    });
    it('should call onChange handler with PAUSED timer state on setPaused', function () {
        var mockCallback = jest.fn(function (_a) {
            var timerState = _a.timerState;
            return timerState;
        });
        var state = new TimerState(mockCallback);
        state.setPlaying();
        state.setPaused();
        expect(mockCallback.mock.results[1].value).toEqual(PAUSED);
    });
    it('should call onChange handler with STOPPED timer state on setStopped', function () {
        var mockCallback = jest.fn(function (_a) {
            var timerState = _a.timerState;
            return timerState;
        });
        var state = new TimerState(mockCallback);
        state.setPlaying();
        state.setStopped();
        expect(mockCallback.mock.results[1].value).toEqual(STOPPED);
    });
    it('should return true for isInited in INITED state', function () {
        var state = new TimerState();
        expect(state.isInited()).toBeTruthy();
    });
    it('should return true for isPlaying in PLAYING state', function () {
        var state = new TimerState();
        state.setPlaying();
        expect(state.isPlaying()).toBeTruthy();
    });
    it('should return true for isPaused in PAUSED state', function () {
        var state = new TimerState();
        state.setPlaying();
        state.setPaused();
        expect(state.isPaused()).toBeTruthy();
    });
    it('should return true for isStopped in STOPPED state', function () {
        var state = new TimerState();
        state.setPlaying();
        state.setStopped();
        expect(state.isStopped()).toBeTruthy();
    });
});
//# sourceMappingURL=TimerState.test.js.map