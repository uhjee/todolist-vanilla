'use script';

var todoList = {
  addTodo(e) {
    const inputEl = document.querySelector('#input-todo');
    if (!inputEl.value || inputEl.value.replaceAll(' ', '').length < 1) {
      // TODO@heojeehaeng ui로 표현하기
      alert('내용을 입력해주세요.');
      inputEl.value = '';
      inputEl.focus();
      return false;
    }

    const todoText = inputEl.value;
    // TODO@heojeehaeng 색 동적으로 받아오기(green, grey, lightgreen, orange)
    const markColor = 'orange';

    // if (e.keyCode != 13) {
    //     return;
    // }

    // 01. Fragment 사용 element 구성
    // live dom 외부에 메모리상 dom 생성(fragment)
    const docFrag = document.createDocumentFragment();
    // 그릇, 매개체 역할만 하는 빈 div element
    const divEl = document.createElement('div');

    docFrag.appendChild(divEl);
    docFrag.querySelector('div').innerHTML =
      //
      `<li class="todo--body__item">
    <div class="mark mark--${markColor}"></div>
    <div class="content">${inputEl.value}</div></li>`;

    const todoBodyEl = document.querySelector('.todo--body');
    todoBodyEl.appendChild(docFrag.querySelector('div').firstChild);

    //  input 초기화
    inputEl.value = '';
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
// 추가 버튼 이벤트 등록
document.querySelector('#add-btn').addEventListener('click', todoList.addTodo);
// // document.querySelector("input.text-basic").addEventListener('keyup', todoList.addList);
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
// inputTodo 관련
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
function getDayString(day) {
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
}
thisYearEl.textContent = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()} (${getDayString(
  today.getDay(),
)})`;

// fragmentDocument와  innerHtml 를 이용해 컴포넌트를 찍어내는 객체
// TODO@heojeehaeng : class로 변경, factory pattern으로 변경
const components = (() => {
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
    btnBoxForTodoItem: makeBtnBoxForTodoItem(),
  };
})();

// list, mouseover, button group
// Event delegate 를 사용한 Event pattern
// TODO@heojeehaeng throttle 하게 적용해도 될 듯.. 알아보자
document.querySelector('.todo--body').addEventListener('mouseover', (e) => {
  const targetClassList = [...e.target.classList];
  // event delegate Container & 추가될 자기 자신 제외
  if (targetClassList.includes('todo--body') || e.target.closest('.btn-box')) {
    return false;
  }
  const itemEl = e.target.closest('.todo--body__item');
  // Element.closest() => 자기 자신 포함해서 searching. 따라서 아래 코드 필요 X
  // const itemEl = targetClassList.includes('todo--body__item') ? e.target : e.target.closest('.todo--body__item');
  itemEl.addEventListener('mouseleave', () => {
    if (itemEl.querySelector('.btn-box')) {
      itemEl.querySelector('.btn-box').remove();
    }
  });
  itemEl.appendChild(components.btnBoxForTodoItem);
});
