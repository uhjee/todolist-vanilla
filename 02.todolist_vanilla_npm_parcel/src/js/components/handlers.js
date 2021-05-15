import _components from './components.js';
import _datas from './datas.js';

// TODO@uhjee ::임시.. edit 진입 시, 원본 데이터 카피..개선해야함
let originContent = '';

// ! 로직 관련 (이벤트 핸들러)----------------------------------------------------------
const _handlers = {
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
  /**
   * mouseOver 이벤트 핸들러, 수정, 삭제 버튼을 item 내에 표현한다.
   *
   * @param   {[type]}  e         [e description]
   * @param   {[type]}  parentEl  [parentEl description]
   *
   * @return  {[type]}            [return description]
   */
  showItemBtnBox: (e, parentEl) => {
    // event delegate Container & 추가될 자기 자신 제외
    if (
      [...e.target.classList].includes('todo--body') ||
      e.target.closest('.btn-box') ||
      e.target.closest('.todo--body__item.editing')
    )
      return; // 구조분해할당을 통한 likeArray => Array
    const itemEl = e.target.closest('.todo--body__item');

    // 유효성 체크
    if (!itemEl || [...itemEl.classList].includes('focused')) return;
    if (!parentEl.contains(itemEl)) return;

    itemEl.addEventListener('mouseleave', () => {
      if (itemEl.querySelector('.btn-box')) {
        itemEl.classList.remove('focused');
        itemEl.querySelector('.btn-box').remove();
      }
    });
    itemEl.classList.add('focused'); // flag 역할
    itemEl.appendChild(_components.makeBtnBoxForTodoItem());
  },

  /**
   * todo-footer의 mark 색상을 선택한다.
   *
   * @param   {[type]}  e  [e description]
   *
   * @return  {[type]}     [return description]
   */
  selectColorMark: (e) => {
    // TODO@heojeehaeng ::isEmpty로 변경
    if (![...e.target.classList].includes('selectable')) return;
    const selectableBtnEl = e.target;
    const selectColorBoxEl = selectableBtnEl.closest('.select-color-box');
    const selectColorBtnEl = document.querySelector('.todo--footer .select-color-btn');

    // color 선택
    if (selectableBtnEl.dataset.action !== 'close') {
      _datas.setSelectedMarkColor(selectableBtnEl.dataset.color);
      selectColorBtnEl.innerHTML = _components.makeMark();
    }

    // close 버튼
    selectColorBoxEl.classList.remove('show');
    return;
  },
  doBtnBoxAction: (e) => {
    const circleBtn = e.target.closest('.circle-btn');
    if (circleBtn) {
      const action = circleBtn.dataset.action;
      let todoItemEl = e.target.closest('.todo--body > .todo--body__item');
      switch (action) {
        case 'edit':
          // TODO@uhjee ::edit
          _handlers.addClass(todoItemEl, 'editing');
          // btn-box 삭제
          if (todoItemEl.querySelector('.btn-box')) {
            todoItemEl.classList.remove('focused');
            todoItemEl.querySelector('.btn-box').remove();
          }
          // content, mark color 가져오기
          const content = todoItemEl.querySelector('.content').innerText;
          const markColorClass = [...todoItemEl.querySelector('.mark').classList].find((i) => i.indexOf('--') > 0);
          const markColor = markColorClass.split('--')[1];

          // 원본 content 저장
          originContent = content;

          const edtingTodoItemEl = _components.makeEditingTodoItem(content, markColor);
          const parentEl = todoItemEl.parentNode;
          // * Node.replaceChild(newChild, oldChild)  --좋아..
          parentEl.replaceChild(edtingTodoItemEl, todoItemEl);
          return;
        case 'delete':
          // TODO@uhjee ::UI로 바꾸기 (validation과 함꼐)
          if (confirm('지우시겠어요?')) {
            console.log(todoItemEl);
            todoItemEl.remove();
            // TODO@uhjee ::모든 요소 삭제시, body background에 글씨 "할일을 적어보세여"
          }
          return;
        case 'check':
          const editedContent = todoItemEl.querySelector('input.input-editing').value;
          const editedTodoItemEl = _components.makeTodoItem(editedContent);
          todoItemEl.parentNode.replaceChild(editedTodoItemEl, todoItemEl);

          // 원본 데이터 메모리 초기화
          originContent = '';
          return;
        case 'cancel':
          const originTodoItemEl = _components.makeTodoItem(originContent);
          // * 사실, content가 아닌 el 자체를 보관해도 될 것 같다.
          todoItemEl.parentNode.replaceChild(originTodoItemEl, todoItemEl);

          originContent = '';
          return;
        default:
          throw new Error('check  attribute of element dataset.action');
      }
    }
  },

  addClass: (element, className) => {
    element?.classList.add(className);
  },
  removeClass: (element, className) => {
    element?.classList.remove(className);
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

export default _handlers;
