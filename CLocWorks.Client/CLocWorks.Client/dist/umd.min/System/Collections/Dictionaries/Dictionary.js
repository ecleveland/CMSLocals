/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../../Compare","../../Types","../../Functions","../Enumeration/EnumeratorBase","../LinkedNodeList","../../Disposable/ObjectPool","./DictionaryBase"],e)}(function(e,t){"use strict";function r(e){return u||(u=new p.ObjectPool(20,function(){return new l.LinkedNodeList},function(e){return e.clear()})),e?void u.add(e):u.take()}function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function o(e){return null===e?v:e===y?s.Type.UNDEFINED:s.Type.hasMemberOfType(e,_,s.Type.FUNCTION)?e.getHashCode():typeof e.toString==s.Type.FUNCTION?e.toString():Object.prototype.toString.call(e)}var u,i=e("../../Compare"),s=e("../../Types"),a=e("../../Functions"),c=e("../Enumeration/EnumeratorBase"),l=e("../LinkedNodeList"),p=e("../../Disposable/ObjectPool"),f=e("./DictionaryBase"),y=void 0,d=function(){function e(e,t,r,n){this.key=e,this.value=t,this.previous=r,this.next=n}return e}(),v="null",_="getHashCode",h=function(e){function t(t){void 0===t&&(t=a.Functions.Identity),e.call(this),this._keyComparer=t,this._entries=r(),this._buckets={}}return __extends(t,e),t.prototype.getCount=function(){return this._entries.unsafeCount},t.prototype._getBucket=function(e,t){if(null===e||e===y||!t&&!this.getCount())return null;var o=this._buckets,u=n(o,e)?o[e]:y;return t&&!u&&(o[e]=u=r()),u},t.prototype._getBucketEntry=function(e,t,r){if(null===e||e===y||!this.getCount())return null;var n=this,u=n._keyComparer,i=u(e);return r||(r=n._getBucket(t||o(i))),r&&r.find(function(e){return u(e.key)===i})},t.prototype._getEntry=function(e){var t=this._getBucketEntry(e);return t&&t.value},t.prototype.getValue=function(e){var t=this._getEntry(e);return t?t.value:y},t.prototype._setValueInternal=function(e,t){var n=this,u=n._buckets,s=n._entries,a=n._keyComparer,c=a(e),l=o(c),p=n._getBucket(l),f=p&&n._getBucketEntry(e,l,p);if(f){if(t!==y){var v=f.value.value;return f.value.value=t,!i.areEqual(t,v)}var _=p.removeNode(f),h=s.removeNode(f.value);if(_&&!p.count&&(delete u[l],r(p),p=null),_!==h)throw"Entries and buckets are out of sync.";if(_)return!0}else if(t!==y){p||(p=n._getBucket(l,!0));var k=new d(e,t);return s.addNode(k),p.addNode(new d(e,k)),!0}return!1},t.prototype._clearInternal=function(){var e=this,t=e._buckets;for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];delete t[n],r(o)}return e._entries.clear()},t.prototype.getEnumerator=function(){var e,t,r=this;return new c.EnumeratorBase(function(){e=r._version,t=r._entries.first},function(n){if(null!=t){r.assertVersion(e);var o={key:t.key,value:t.value};return t=t.next,n.yieldReturn(o)}return n.yieldBreak()})},t.prototype.getKeys=function(){for(var e=this,t=[],r=e._entries.first;r;)t.push(r.key),r=r.next;return t},t.prototype.getValues=function(){for(var e=this,t=[],r=e._entries.first;r;)t.push(r.value),r=r.next;return t},t}(f["default"]);t.Dictionary=h,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=h});
//# sourceMappingURL=Dictionary.js.map
