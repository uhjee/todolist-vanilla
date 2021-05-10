'use script';

// TODO@heojeehaeng - data & UI 를 분리하자.....
// ! Datas
// IIFE, Closure - 비공개 변수를 만들어 접근 못하도록
const _data = (() => {
  let todoList = [
    // example: 아래 같은 형식으로 list
    {
      color: 'orange',
      text: '컨텍스트 내용',
    },
  ];
  let todoText = '';
  let selectedMarkColor = 'green'; // default

  // todoText Setter, Getter
  const setTodoText = (text) => {
    todoText = text;
  };
  const getTodoText = () => todoText;

  // selectedMarkColor Setter, Getter
  const setSelectedMarkColor = (color) => {
    if (!color) return;
    selectedMarkColor = color;
  };
  const getSelectedMarkColor = () => selectedMarkColor;

  // Exposed functions  => Closure
  return {
    setSelectedMarkColor: (color) => {
      setSelectedMarkColor(color);
    },
    getSelectedMarkColor: () => getSelectedMarkColor(),
    setTodoText: (text) => {
      setTodoText(text);
    },
    getTodoText: () => getTodoText(),
  };
})();

/**
 *  TODO@heojeehaeng : class로 변경, factory pattern?으로 변경
 * ! Components fragmentDocument와  innerHtml 를 이용해 컴포넌트를 만드는 함수를 반환한다.
 * @return  {[type]}  make[componentName] 네이밍을 가진 컴포넌트 만드는 함수를
 */
// IIFE, Closure - 비공개 변수를 만들어 접근 못하도록
const _components = (() => {
  /**
   * todo-item component 를 반환한다.
   *
   * @param   {[type]}  text       todo 텍스트 콘텐츠
   * @param   {[type]}  markColor  green, lightGreen, grey, *orange(default)
   * @author  uhjee
   * @return  {[type]}             todo-item component
   */
  const makeTodoItem = (text) => {
    const docFrag = document.createDocumentFragment();
    // 그릇, 매개체 역할만 하는 빈 div element
    const divEl = document.createElement('div');

    docFrag.appendChild(divEl);
    docFrag.querySelector('div').innerHTML = `
      <li class="todo--body__item">
          <div class="mark mark--${_data.getSelectedMarkColor()}"></div>
          <div class="content">${text}</div>
      </li>`;
    // why cloneNode? Fragment element는 append 되면 메모리에서 사라짐.
    return docFrag.cloneNode(true).querySelector('div').firstElementChild;
  };

  /**
   * btn-box component (edit, delete btn) 를 반환한다.
   * @author  uhjee
   * @return  {[type]}  btn-box component (edit, delete btn)
   */
  const makeBtnBoxForTodoItem = () => {
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
  };

  /**
   * mark component를 반환한다.
   *
   * @author  uhjee
   * @param   {[type]}  color  mark의 색
   *
   * @return  {[type]}         mark compoenent
   */
  const makeMark = () => `
    <div class="mark mark--${_data.getSelectedMarkColor()}"></div>
    `;

  return {
    makeTodoItem: (text) => makeTodoItem(text),
    makeBtnBoxForTodoItem: () => makeBtnBoxForTodoItem(),
    makeMark: () => makeMark(),
  };
})();

// ! 로직 관련 (이벤트 핸들러)----------------------------------------------------------
const _handler = {
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

    const todoBodyEl = document.querySelector('.todo--body');
    todoBodyEl.appendChild(_components.makeTodoItem(inputEl.value));

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
    itemEl.appendChild(_components.makeBtnBoxForTodoItem());
  },

  selectColorMark: (e) => {
    // TODO@heojeehaeng ::isEmpty로 변경
    if (![...e.target.classList].includes('selectable')) return;
    const selectableBtn = e.target;
    // close 버튼
    if (selectableBtn.dataset.action === 'close') {
      selectColorBox.classList.remove('show');
      return;
    }

    _data.setSelectedMarkColor(selectableBtn.dataset.color);

    selectColorBtnEl.innerHTML = _components.makeMark();
    // TODO@uhjee :: DATA BINDING!!!!
    selectColorBox.classList.remove('show');
    return;
  },
  addClass: (element, className) => () => {
    element.classList.add(className);
  },
  removeClass: (element, className) => () => {
    element.classList.remove(className);
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
// ! Utility Functions
const _util = {
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

// 추가 버튼 이벤트 등록
// TODO@uhjee :: 추가 DATA BINDING!!!!

// TODO@uhjee :: input-todo validation check
// document.querySelector('#input-todo').addEventListener('keyup', (e) => {
//   _data.setTodoText(e.target.value);

//   console.log(_data.getTodoText());
// });

document.querySelector('#add-btn').addEventListener('click', _handler.addTodo);

document.querySelector('.todo--body__item').addEventListener('');
//  document.querySelector("input.text-basic").addEventListener('keyup', _handler.addList);
// // 모두 완료 버튼 이벤트 등록
// document.getElementById('btnDelAll').addEventListener('click', _handler.delAllEle);
// // 마지막 엘레먼트 완료 버튼 이벤트 등록
// document.getElementById('btnDelLast').addEventListener('click', _handler.delLastEle);
// // 선택 완료 버튼 이벤트 등록
// document.getElementById('DeleteSel').addEventListener('click', _handler.delSelected);

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
inputTodoEl.addEventListener('focus', _handler.addClass(inputTodoEl, 'focused'));
inputTodoEl.addEventListener('blur', _handler.removeClass(inputTodoEl, 'focused'));

// 날짜 표현(오늘)
const thisYearEl = document.querySelector('.this-year');
const today = new Date();

thisYearEl.textContent = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()} (${_util.getDayString(
  today.getDay(),
)})`;

// * todo--item: mouseover, button group -- Event delegattion
// TODO@heojeehaeng throttle 하게 적용해도 될 듯.. 알아보자
const todoBodyEl = document.querySelector('.todo--body');
todoBodyEl.addEventListener('mouseover', _handler.showItemBtnBox);

// * select-color-box 관련
const selectColorBtnEl = document.querySelector('.select-color-btn');
const selectColorBox = document.querySelector('.select-color-box');
selectColorBtnEl.addEventListener('click', () => {
  selectColorBox.classList.add('show');
});

selectColorBox.addEventListener('click', _handler.selectColorMark);
