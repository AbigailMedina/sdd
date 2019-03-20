var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import getTimeParts from './getTimeParts';
describe('#getTimeParts', function () {
    [
        [30, 'ms', { ms: 30 }],
        [1030, 'ms', { ms: 1030 }],
        [1030, 's', { s: 1, ms: 30 }],
        [61030, 's', { s: 61, ms: 30 }],
        [61030, 'm', { m: 1, s: 1, ms: 30 }],
        [3601030, 'm', { m: 60, s: 1, ms: 30 }],
        [3661030, 'h', { h: 1, m: 1, s: 1, ms: 30 }],
        [86461030, 'h', { h: 24, m: 1, s: 1, ms: 30 }],
        [90061030, 'd', { d: 1, h: 1, m: 1, s: 1, ms: 30 }],
    ].forEach(function (_a) {
        var time = _a[0], lastUnit = _a[1], result = _a[2];
        it("should return right result for time = " + time + " and lastUnit = " + lastUnit, function () {
            expect(getTimeParts(time, lastUnit)).toStrictEqual(__assign({ ms: 0, s: 0, m: 0, h: 0, d: 0 }, result));
        });
    });
});
//# sourceMappingURL=getTimeParts.test.js.map