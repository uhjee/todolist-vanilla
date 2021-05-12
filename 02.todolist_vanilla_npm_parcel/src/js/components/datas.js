// TODO@heojeehaeng - data & UI 를 분리하자.....
// ! Datas
// IIFE, Closure - 비공개 변수를 만들어 접근 못하도록
export default (() => {
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
