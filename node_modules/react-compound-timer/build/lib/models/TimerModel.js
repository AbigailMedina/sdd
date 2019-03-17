import getTimeParts from '../helpers/getTimeParts';
import TimerState from './TimerState';
var Timer = /** @class */ (function () {
    function Timer(_a) {
        var _b = _a.initialTime, initialTime = _b === void 0 ? 0 : _b, _c = _a.direction, direction = _c === void 0 ? 'forward' : _c, _d = _a.timeToUpdate, timeToUpdate = _d === void 0 ? 1000 : _d, _e = _a.lastUnit, lastUnit = _e === void 0 ? 'd' : _e, _f = _a.checkpoints, checkpoints = _f === void 0 ? [] : _f, _g = _a.onChange, onChange = _g === void 0 ? function () { } : _g;
        this.initialTime = initialTime;
        this.time = initialTime;
        this.direction = direction;
        this.timeToUpdate = timeToUpdate;
        this.lastUnit = lastUnit;
        this.checkpoints = checkpoints;
        this.innerState = new TimerState(onChange);
        this.onChange = onChange;
        this.timerId = null;
    }
    Object.defineProperty(Timer.prototype, "state", {
        get: function () {
            return this.innerState.getState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "timeParts", {
        get: function () {
            return this.getTimeParts(this.computeTime());
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.getTimeParts = function (time) {
        return getTimeParts(time, this.lastUnit);
    };
    Timer.prototype.setTime = function (time) {
        this.time = time;
    };
    Timer.prototype.getTime = function () {
        return this.time;
    };
    Timer.prototype.setDirection = function (direction) {
        this.direction = direction;
    };
    Timer.prototype.setCheckpoints = function (checkpoints) {
        this.checkpoints = checkpoints;
    };
    Timer.prototype.start = function () {
        if (this.innerState.setPlaying()) {
            this.setTimerInterval(true);
        }
    };
    Timer.prototype.resume = function () {
        if (!this.innerState.isStopped() && this.innerState.setPlaying()) {
            this.setTimerInterval();
        }
    };
    Timer.prototype.pause = function () {
        if (this.innerState.setPaused()) {
            clearInterval(this.timerId);
        }
    };
    Timer.prototype.stop = function () {
        if (this.innerState.setStopped()) {
            clearInterval(this.timerId);
        }
    };
    Timer.prototype.reset = function () {
        this.time = this.initialTime;
        this.onChange(this.getTimeParts(this.time));
    };
    Timer.prototype.setTimerInterval = function (callImmediately) {
        var _this = this;
        if (callImmediately === void 0) { callImmediately = false; }
        var repeatedFunc = function () {
            var oldTime = _this.time;
            var updatedTime = _this.computeTime();
            _this.onChange(_this.getTimeParts(updatedTime));
            _this.checkpoints.map(function (_a) {
                var time = _a.time, callback = _a.callback;
                var checkForForward = time > oldTime && time <= updatedTime;
                var checkForBackward = time < oldTime && time >= updatedTime;
                var checkIntersection = _this.direction === 'backward' ?
                    checkForBackward :
                    checkForForward;
                if (checkIntersection) {
                    callback();
                }
            });
        };
        callImmediately && this.onChange(this.getTimeParts(this.time));
        this.timerId = setInterval(repeatedFunc, this.timeToUpdate);
    };
    Timer.prototype.computeTime = function () {
        if (this.innerState.isPlaying()) {
            switch (this.direction) {
                case 'forward':
                    this.time = this.time + this.timeToUpdate;
                    return this.time;
                case 'backward': {
                    this.time = this.time - this.timeToUpdate;
                    if (this.time < 0) {
                        this.stop();
                        return 0;
                    }
                    return this.time;
                }
                default:
                    return this.time;
            }
        }
        return this.time;
    };
    return Timer;
}());
export default Timer;
//# sourceMappingURL=TimerModel.js.map