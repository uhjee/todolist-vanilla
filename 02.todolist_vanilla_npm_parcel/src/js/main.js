import _datas from './components/datas.js';
import _components from './components/components.js';
import _handlers from './components/handlers.js';
import { getDateWithDayString } from './components/utils.js';

// var doneList = {
//   delAllEle: function () {
//     var list = document.getElementById('done-listBody');
//     // parentNode.children :: 모든 자식 노드의 El들을 담고 있는 HTMLCollection을 리턴
//     var listChild = list.children;
//     var listChildLen = listChild.length;

//     if (listChild.length == 0) {
//       alert('완료할 목록이 없습니다.');
//       return;
//     }

//     for (let index = 0; index < listChildLen; index++) {
//       var tr = document.createElement('tr');
//       var input = document.createElement('input');
//       input.setAttribute('type', 'checkbox');
//       input.setAttribute('class', 'btn-chk');

//       var td01 = document.createElement('td');
//       td01.appendChild(input);
//       tr.appendChild(td01);

//       var td02 = document.createElement('td');

//       td02.innerHTML = listChild[0].innerText;
//       tr.appendChild(td02);
//       document.getElementById('listBody').appendChild(tr);
//       // 삭제하는 코드
//       list.removeChild(listChild[0]);
//     }
//   },
//   delLastEle: function () {
//     var body = document.getElementById('done-listBody');
//     var list = document.querySelectorAll('#done-listBody > tr');
//     var liLen = list.length - 1;

//     if (list.length == 0) {
//       alert('삭제할 항목이 없습니다.');
//       return false;
//     }

//     var tr = document.createElement('tr');
//     var input = document.createElement('input');
//     input.setAttribute('type', 'checkbox');
//     input.setAttribute('class', 'btn-chk');

//     var td01 = document.createElement('td');
//     td01.appendChild(input);
//     tr.appendChild(td01);

//     var td02 = document.createElement('td');

//     td02.innerHTML = list[liLen].children[1].innerText;
//     tr.appendChild(td02);
//     document.getElementById('listBody').appendChild(tr);

//     body.removeChild(list[liLen]);
//   },
//   delSelected: function () {
//     var body = document.getElementById('done-listBody');
//     var chkbox = document.querySelectorAll('#done-listBody .done-btn-chk');

//     document.querySelectorAll("#done-listBody .done-btn-chk[type='checked']");

//     if (chkbox.length == 0) {
//       alert('복원할 항목이 없습니다.');
//       return;
//     }
//     for (var i = 0; i < chkbox.length; i++) {
//       if (chkbox[i].nodeType == 1 && chkbox[i].checked == true) {
//         var tr = document.createElement('tr');
//         var input = document.createElement('input');
//         input.setAttribute('type', 'checkbox');
//         input.setAttribute('class', 'btn-chk');

//         var td01 = document.createElement('td');
//         td01.appendChild(input);
//         tr.appendChild(td01);

//         var td02 = document.createElement('td');

//         td02.innerHTML = chkbox[i].parentNode.parentNode.children[1].innerText;
//         tr.appendChild(td02);
//         document.getElementById('listBody').appendChild(tr);

//         // checkbox의 부모의 부모 == tr El를 삭제해준다.
//         body.removeChild(chkbox[i].parentNode.parentNode);
//       }
//     }
//   },
// };

// 추가 버튼 이벤트 등록
// TODO@uhjee :: 추가 DATA BINDING!!!!

// TODO@uhjee :: input-todo validation check
// document.querySelector('#input-todo').addEventListener('keyup', (e) => {
//   _datas.setTodoText(e.target.value);

//   console.log(_datas.getTodoText());
// });

document.querySelector('#add-btn').addEventListener('click', _handlers.addTodo);

//  document.querySelector("input.text-basic").addEventListener('keyup', _handlers.addList);
// // 모두 완료 버튼 이벤트 등록
// document.getElementById('btnDelAll').addEventListener('click', _handlers.delAllEle);
// // 마지막 엘레먼트 완료 버튼 이벤트 등록
// document.getElementById('btnDelLast').addEventListener('click', _handlers.delLastEle);
// // 선택 완료 버튼 이벤트 등록
// document.getElementById('DeleteSel').addEventListener('click', _handlers.delSelected);

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
inputTodoEl.addEventListener('focus', _handlers.addClass(inputTodoEl, 'focused'));
inputTodoEl.addEventListener('blur', _handlers.removeClass(inputTodoEl, 'focused'));

// 날짜 표현(오늘)
const thisYearEl = document.querySelector('.this-year');

thisYearEl.textContent = getDateWithDayString();

// * todo--item: mouseover, btn-box : Event delegattion
// TODO@heojeehaeng throttle 하게 적용해도 될 듯.. 알아보자
const todoBodyEl = document.querySelector('.todo--body');
todoBodyEl.addEventListener('mouseover', (e) => _handlers.showItemBtnBox(e, todoBodyEl));

// * click, btn-box
todoBodyEl.addEventListener('click', _handlers.doBtnBoxAction);

// * select-color-box 관련
const selectColorBtnEl = document.querySelector('.select-color-btn');
const selectColorBox = document.querySelector('.select-color-box');
selectColorBtnEl.addEventListener('click', () => {
  selectColorBox.classList.add('show');
});

selectColorBox.addEventListener('click', _handlers.selectColorMark);
