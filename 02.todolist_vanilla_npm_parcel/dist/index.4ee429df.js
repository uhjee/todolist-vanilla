// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3AS1F":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "e0dcefe8574811b2e7c6ae8a4ee429df";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"SXDIM":[function(require,module,exports) {
'use script';

/**
 *  TODO@heojeehaeng : class로 변경, factory pattern?으로 변경
 * ! Components fragmentDocument와  innerHtml 를 이용해 컴포넌트를 만드는 함수를 반환한다.
 * @return  {[type]}  make[componentName] 네이밍을 가진 컴포넌트 만드는 함수를
 */
const components = (() => {
  /**
   * todo-item component 를 반환한다.
   *
   * @param   {[type]}  text       todo 텍스트 콘텐츠
   * @param   {[type]}  markColor  green, lightGreen, grey, *orange(default)
   * @author  uhjee
   * @return  {[type]}             todo-item component
   */
  function makeTodoItem(text, markColor = 'orange') {
    const docFrag = document.createDocumentFragment();
    // 그릇, 매개체 역할만 하는 빈 div element
    const divEl = document.createElement('div');

    docFrag.appendChild(divEl);
    docFrag.querySelector('div').innerHTML = `
      <li class="todo--body__item">
          <div class="mark mark--${markColor}"></div>
          <div class="content">${text}</div>
      </li>`;
    // why cloneNode? Fragment element는 append 되면 메모리에서 사라짐.
    return docFrag.cloneNode(true).querySelector('div').firstElementChild;
  }

  /**
   * btn-box component (edit, delete btn) 를 반환한다.
   * @author  uhjee
   * @return  {[type]}  btn-box component (edit, delete btn)
   */
  function makeBtnBoxForTodoItem() {
    const docFrag = document.createDocumentFragment();
    const divEl = document.createElement('div');
    docFrag.appendChild(divEl);
    docFrag.querySelector('div').innerHTML = `
      <div class="btn-box">
        <a href="javascript:void(0)" class="circle-btn circle-btn--edit">
          <div class="material-icons">edit</div>
        </a>
        <a href="javascript:void(0)" class="circle-btn circle-btn--delete">
          <div class="material-icons">clear</div>
        </a>
      </div>`;

    return docFrag.cloneNode(true).querySelector('div').firstElementChild;
  }

  return {
    makeTodoItem,
    makeBtnBoxForTodoItem,
  };
})();

// TODO@heojeehaeng - data & UI 를 분리하자.....
const data = function () {
  const todoList = [];
  return {
    getTodoListData,
    addTodoItemData,
  };
};

// ! 로직 관련 (이벤트 핸들러)----------------------------------------------------------
const todoList = {
  /**
   * todo--body에 todo-item을 추가한다.
   *
   * @return  {[type]}     [return description]
   */
  addTodo: () => {
    const inputEl = document.querySelector('#input-todo');
    if (!inputEl.value || inputEl.value.replaceAll(' ', '').length < 1) {
      // TODO@heojeehaeng ui로 표현하기
      alert('내용을 입력해주세요.');
      inputEl.value = '';
      inputEl.focus();
      return;
    }

    // TODO@heojeehaeng 색 동적으로 받아오기(green, grey, lightgreen, orange)
    const markColor = 'green';

    const todoBodyEl = document.querySelector('.todo--body');
    todoBodyEl.appendChild(components.makeTodoItem(inputEl.value, markColor));

    //  input 초기화
    inputEl.value = '';
  },
  showItemBtnBox: (e) => {
    // event delegate Container & 추가될 자기 자신 제외
    if ([...e.target.classList].includes('todo--body') || e.target.closest('.btn-box')) return; // 구조분해할당을 통한 likeArray => Array
    const itemEl = e.target.closest('.todo--body__item');

    // 유효성 체크
    if (!itemEl || [...itemEl.classList].includes('focused')) return;
    if (!todoBodyEl.contains(itemEl)) return;

    itemEl.addEventListener('mouseleave', () => {
      if (itemEl.querySelector('.btn-box')) {
        itemEl.classList.remove('focused');
        itemEl.querySelector('.btn-box').remove();
      }
    });
    itemEl.classList.add('focused'); // flag 역할
    itemEl.appendChild(components.makeBtnBoxForTodoItem());
  },
  delAllEle: function () {
    var list = document.getElementById('listBody');
    // parentNode.children :: 모든 자식 노드의 El들을 담고 있는 HTMLCollection을 리턴
    var listChild = list.children;
    var listChildLen = listChild.length;

    if (listChild.length == 0) {
      alert('완료할 목록이 없습니다.');
      return;
    }

    for (var index = 0; index < listChildLen; index++) {
      var tr = document.createElement('tr');
      var input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('class', 'done-btn-chk');

      var td01 = document.createElement('td');
      td01.appendChild(input);
      tr.appendChild(td01);

      var td02 = document.createElement('td');

      td02.innerHTML = listChild[0].innerText;
      tr.appendChild(td02);
      document.getElementById('done-listBody').appendChild(tr);
      // 삭제하는 코드
      list.removeChild(listChild[0]);
    }
  },
  delLastEle: function () {
    var body = document.getElementById('listBody');
    var list = document.querySelectorAll('#listBody > tr');
    var liLen = list.length - 1;

    if (list.length == 0) {
      alert('완료할 항목이 없습니다.');
      return false;
    }

    var tr = document.createElement('tr');
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('class', 'done-btn-chk');

    var td01 = document.createElement('td');
    td01.appendChild(input);
    tr.appendChild(td01);

    var td02 = document.createElement('td');

    td02.innerHTML = list[liLen].children[1].innerText;
    tr.appendChild(td02);
    document.getElementById('done-listBody').appendChild(tr);

    body.removeChild(list[liLen]);
  },
  delSelected: function () {
    var body = document.getElementById('listBody');
    var chkbox = document.querySelectorAll('#listBody .btn-chk');

    if (chkbox.length == 0) {
      alert('완료할 항목이 없습니다.');
      return;
    }

    for (var i = 0; i < chkbox.length; i++) {
      if (chkbox[i].nodeType == 1 && chkbox[i].checked == true) {
        var tr = document.createElement('tr');
        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('class', 'done-btn-chk');

        var td01 = document.createElement('td');
        td01.appendChild(input);
        tr.appendChild(td01);

        var td02 = document.createElement('td');

        td02.innerHTML = chkbox[i].parentNode.parentNode.children[1].innerText;
        tr.appendChild(td02);
        document.getElementById('done-listBody').appendChild(tr);

        // checkbox의 부모의 부모 == tr El를 삭제해준다.
        body.removeChild(chkbox[i].parentNode.parentNode);
      }
    }
  },
  /**
   * 요일(num)에 따른 약어 요일(String)을 반환한다.
   * @author  uhjee
   * @param   {[type]}  day  숫자형 day(Date.getDay() 반환값)
   *
   * @return  {[type]}       약어 요일(String) e.g. Sun
   */
  getDayString: (day) => {
    switch (day) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wen';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        throw new Error('Not exist the day!');
    }
  },
};
var doneList = {
  delAllEle: function () {
    var list = document.getElementById('done-listBody');
    // parentNode.children :: 모든 자식 노드의 El들을 담고 있는 HTMLCollection을 리턴
    var listChild = list.children;
    var listChildLen = listChild.length;

    if (listChild.length == 0) {
      alert('완료할 목록이 없습니다.');
      return;
    }

    for (let index = 0; index < listChildLen; index++) {
      var tr = document.createElement('tr');
      var input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('class', 'btn-chk');

      var td01 = document.createElement('td');
      td01.appendChild(input);
      tr.appendChild(td01);

      var td02 = document.createElement('td');

      td02.innerHTML = listChild[0].innerText;
      tr.appendChild(td02);
      document.getElementById('listBody').appendChild(tr);
      // 삭제하는 코드
      list.removeChild(listChild[0]);
    }
  },
  delLastEle: function () {
    var body = document.getElementById('done-listBody');
    var list = document.querySelectorAll('#done-listBody > tr');
    var liLen = list.length - 1;

    if (list.length == 0) {
      alert('삭제할 항목이 없습니다.');
      return false;
    }

    var tr = document.createElement('tr');
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('class', 'btn-chk');

    var td01 = document.createElement('td');
    td01.appendChild(input);
    tr.appendChild(td01);

    var td02 = document.createElement('td');

    td02.innerHTML = list[liLen].children[1].innerText;
    tr.appendChild(td02);
    document.getElementById('listBody').appendChild(tr);

    body.removeChild(list[liLen]);
  },
  delSelected: function () {
    var body = document.getElementById('done-listBody');
    var chkbox = document.querySelectorAll('#done-listBody .done-btn-chk');

    document.querySelectorAll("#done-listBody .done-btn-chk[type='checked']");

    if (chkbox.length == 0) {
      alert('복원할 항목이 없습니다.');
      return;
    }
    for (var i = 0; i < chkbox.length; i++) {
      if (chkbox[i].nodeType == 1 && chkbox[i].checked == true) {
        var tr = document.createElement('tr');
        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('class', 'btn-chk');

        var td01 = document.createElement('td');
        td01.appendChild(input);
        tr.appendChild(td01);

        var td02 = document.createElement('td');

        td02.innerHTML = chkbox[i].parentNode.parentNode.children[1].innerText;
        tr.appendChild(td02);
        document.getElementById('listBody').appendChild(tr);

        // checkbox의 부모의 부모 == tr El를 삭제해준다.
        body.removeChild(chkbox[i].parentNode.parentNode);
      }
    }
  },
};
// 추가 버튼 이벤트 등록
document.querySelector('#add-btn').addEventListener('click', todoList.addTodo);
//  document.querySelector("input.text-basic").addEventListener('keyup', todoList.addList);
// // 모두 완료 버튼 이벤트 등록
// document.getElementById('btnDelAll').addEventListener('click', todoList.delAllEle);
// // 마지막 엘레먼트 완료 버튼 이벤트 등록
// document.getElementById('btnDelLast').addEventListener('click', todoList.delLastEle);
// // 선택 완료 버튼 이벤트 등록
// document.getElementById('DeleteSel').addEventListener('click', todoList.delSelected);

// // 모두 복원 버튼 이벤트 등록
// document.getElementById('done-btnDelAll').addEventListener('click', doneList.delAllEle);
// // 마지막 엘레먼트 복원 버튼 이벤트 등록
// document.getElementById('done-btnDelLast').addEventListener('click', doneList.delLastEle);
// // 선택 복원 버튼 이벤트 등록
// document.getElementById('done-DeleteSel').addEventListener('click', doneList.delSelected);

// ! css 관련 - 추후 js 리팩토링시 통합 ---------------------------------------------------------------------

//  ! HEADER BAR 관련 이벤트
// saerch 관련 이벤트
const searchEl = document.querySelector('.right .search');
const searchInputEl = document.querySelector('.right .search input');

searchEl.addEventListener('click', () => {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', () => {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', 'Search your memory!');
});

searchInputEl.addEventListener('blur', () => {
  searchEl.classList.remove('focused');
  searchInputEl.removeAttribute('placeholder');
});

//  ! TODO CARD 관련 이벤트.
// * input-todo 관련
const inputTodoEl = document.querySelector('#input-todo');
inputTodoEl.addEventListener('focus', () => {
  inputTodoEl.classList.add('focused');
});
inputTodoEl.addEventListener('blur', () => {
  inputTodoEl.classList.remove('focused');
});

// 날짜 표현(오늘)
const thisYearEl = document.querySelector('.this-year');
const today = new Date();

thisYearEl.textContent = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()} (${todoList.getDayString(
  today.getDay(),
)})`;

// * todo--item: mouseover, button group -- Event delegattion
// TODO@heojeehaeng throttle 하게 적용해도 될 듯.. 알아보자
const todoBodyEl = document.querySelector('.todo--body');
todoBodyEl.addEventListener('mouseover', todoList.showItemBtnBox);

// * select-color-box 관련
const selectColorBtnEl = document.querySelector('.select-color-btn');
const selectColorBox = document.querySelector('.select-color-box');
selectColorBtnEl.addEventListener('click', () => {
  selectColorBox.classList.add('show');
});

selectColorBox.addEventListener('click', (e) => {
  // if(e.target.dataset
  // TODO@heojeehaeng ::isEmpty로 변경
  if (![...e.target.classList].includes('selectable')) return;
  console.log(e.target.dataset.action);
  if (e.target.dataset.action === 'close') {
    selectColorBox.classList.remove('show');
    return;
  }

  // console.log(!!e.target.dataset);
});

},{}]},["3AS1F","SXDIM"], "SXDIM", "parcelRequire6e5b")

//# sourceMappingURL=index.4ee429df.js.map
