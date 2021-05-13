import _datas from './datas.js';

/**
 *  TODO@heojeehaeng : class로 변경, factory pattern?으로 변경
 * ! Components fragmentDocument와  innerHtml 를 이용해 컴포넌트를 만드는 함수를 반환한다.
 * @return  {[type]}  make[componentName] 네이밍을 가진 컴포넌트 만드는 함수를
 */
// IIFE, Closure - 비공개 변수를 만들어 접근 못하도록
export default (() => {
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
          <div class="mark mark--${_datas.getSelectedMarkColor()}"></div>
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
        <a href="javascript:void(0)" class="circle-btn circle-btn--edit" data-action="edit">
          <div class="material-icons">edit</div>
        </a>
        <a href="javascript:void(0)" class="circle-btn circle-btn--delete" data-action="delete">
          <div class="material-icons">delete_forever</div>
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
    <div class="mark mark--${_datas.getSelectedMarkColor()}"></div>
    `;

  /**
   * 수정 중인 todoItem component 를 반환한다.
   *
   * @param   {[type]}  content    [content 수전 전의 item text]
   * @param   {[type]}  markColor  [markColor 수정 전의 mark color]
   *
   * @return  {[type]}             [return editingTodoItem]
   */
  const makeEditingTodoItem = (content, markColor) => {
    const docFrag = document.createDocumentFragment();
    const divEl = document.createElement('div');
    docFrag.appendChild(divEl);
    docFrag.querySelector('div').innerHTML = `
      <div class="btn-box btn-box--editing">
        <div class="mark mark--${markColor}"></div>
        <input class="input-editing" type="text" />
        <div class="btn-box btn-box--editing">
          <a href="javascript:void(0)" class="circle-btn circle-btn--check" data-action="check">
            <div class="material-icons">done</div>
          </a>
          <a href="javascript:void(0)" class="circle-btn circle-btn--cancel" data-action="cancel">
            <div class="material-icons">clear</div>
          </a>
        </div>
      </div>
    `;
    const inputEl = docFrag.querySelector('input.input-editing');
    inputEl.textContent = content;
    // console.log(divEl);
    return docFrag.cloneNode(true).querySelector('div').firstElementChild;
  };

  return {
    makeTodoItem: (text) => makeTodoItem(text),
    makeBtnBoxForTodoItem: () => makeBtnBoxForTodoItem(),
    makeMark: () => makeMark(),
    makeEditingTodoItem: (content, markColor) => makeEditingTodoItem(content, markColor),
  };
})();
