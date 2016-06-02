/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports","../Time/TimeSpan"],function(e,n,t){"use strict";function i(){return(new Date).getTime()}var r=function(){function e(){this.reset()}return e.getTimestampMilliseconds=function(){return i()},Object.defineProperty(e.prototype,"isRunning",{get:function(){return this._isRunning},enumerable:!0,configurable:!0}),e.startNew=function(){var n=new e;return n.start(),n},e.measure=function(e){var n=i();return e(),new t.TimeSpan(i()-n)},e.prototype.start=function(){var e=this;e._isRunning||(e._startTimeStamp=i(),e._isRunning=!0)},e.prototype.stop=function(){var e=this;e._isRunning&&(e._elapsed+=e.currentLapMilliseconds,e._isRunning=!1)},e.prototype.reset=function(){var e=this;e._elapsed=0,e._isRunning=!1,e._startTimeStamp=NaN},e.prototype.lap=function(){var e=this;if(e._isRunning){var n=i(),r=e._startTimeStamp,s=n-r;return e._startTimeStamp=n,e._elapsed+=s,new t.TimeSpan(s)}return t.TimeSpan.zero},Object.defineProperty(e.prototype,"currentLapMilliseconds",{get:function(){return this._isRunning?i()-this._startTimeStamp:0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentLap",{get:function(){return this._isRunning?new t.TimeSpan(this.currentLapMilliseconds):t.TimeSpan.zero},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"elapsedMilliseconds",{get:function(){var e=this,n=e._elapsed;return e._isRunning&&(n+=e.currentLapMilliseconds),n},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"elapsed",{get:function(){return new t.TimeSpan(this.elapsedMilliseconds)},enumerable:!0,configurable:!0}),e}();Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r});
//# sourceMappingURL=Stopwatch.js.map
