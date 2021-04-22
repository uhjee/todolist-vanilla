var todoList = {
  addList: function (e) {
    var contents = document.querySelector(".text-basic");
    if (!contents.value) {
      alert("내용을 입력해주세요.");
      contents.focus();
      return false;
    }

    // if (e.keyCode != 13) {
    //     return;
    // }

    var tr = document.createElement("tr");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "btn-chk");

    var td01 = document.createElement("td");
    td01.appendChild(input);
    tr.appendChild(td01);

    var td02 = document.createElement("td");
    td02.innerHTML = contents.value;
    tr.appendChild(td02);

    document.getElementById("listBody").appendChild(tr);
    contents.value = "";
    contents.focus();
  },
  delAllEle: function () {
    var list = document.getElementById("listBody");
    // parentNode.children :: 모든 자식 노드의 El들을 담고 있는 HTMLCollection을 리턴
    var listChild = list.children;
    var listChildLen = listChild.length;

    if (listChild.length == 0) {
      alert("완료할 목록이 없습니다.");
      return;
    }

    for (var index = 0; index < listChildLen; index++) {
      var tr = document.createElement("tr");
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("class", "done-btn-chk");

      var td01 = document.createElement("td");
      td01.appendChild(input);
      tr.appendChild(td01);

      var td02 = document.createElement("td");

      td02.innerHTML = listChild[0].innerText;
      tr.appendChild(td02);
      document.getElementById("done-listBody").appendChild(tr);
      // 삭제하는 코드
      list.removeChild(listChild[0]);
    }
  },
  delLastEle: function () {
    var body = document.getElementById("listBody");
    var list = document.querySelectorAll("#listBody > tr");
    var liLen = list.length - 1;

    if (list.length == 0) {
      alert("완료할 항목이 없습니다.");
      return false;
    }

    var tr = document.createElement("tr");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "done-btn-chk");

    var td01 = document.createElement("td");
    td01.appendChild(input);
    tr.appendChild(td01);

    var td02 = document.createElement("td");

    td02.innerHTML = list[liLen].children[1].innerText;
    tr.appendChild(td02);
    document.getElementById("done-listBody").appendChild(tr);

    body.removeChild(list[liLen]);
  },
  delSelected: function () {
    var body = document.getElementById("listBody");
    var chkbox = document.querySelectorAll("#listBody .btn-chk");

    if (chkbox.length == 0) {
      alert("완료할 항목이 없습니다.");
      return;
    }

    for (var i = 0; i < chkbox.length; i++) {
      if (chkbox[i].nodeType == 1 && chkbox[i].checked == true) {
        var tr = document.createElement("tr");
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "done-btn-chk");

        var td01 = document.createElement("td");
        td01.appendChild(input);
        tr.appendChild(td01);

        var td02 = document.createElement("td");

        td02.innerHTML = chkbox[i].parentNode.parentNode.children[1].innerText;
        tr.appendChild(td02);
        document.getElementById("done-listBody").appendChild(tr);

        // checkbox의 부모의 부모 == tr El를 삭제해준다.
        body.removeChild(chkbox[i].parentNode.parentNode);
      }
    }
  },
};
var doneList = {
  delAllEle: function () {
    var list = document.getElementById("done-listBody");
    // parentNode.children :: 모든 자식 노드의 El들을 담고 있는 HTMLCollection을 리턴
    var listChild = list.children;
    var listChildLen = listChild.length;

    if (listChild.length == 0) {
      alert("완료할 목록이 없습니다.");
      return;
    }

    for (let index = 0; index < listChildLen; index++) {
      var tr = document.createElement("tr");
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("class", "btn-chk");

      var td01 = document.createElement("td");
      td01.appendChild(input);
      tr.appendChild(td01);

      var td02 = document.createElement("td");

      td02.innerHTML = listChild[0].innerText;
      tr.appendChild(td02);
      document.getElementById("listBody").appendChild(tr);
      // 삭제하는 코드
      list.removeChild(listChild[0]);
      // index++;
    }
  },
  delLastEle: function () {
    var body = document.getElementById("done-listBody");
    var list = document.querySelectorAll("#done-listBody > tr");
    var liLen = list.length - 1;

    if (list.length == 0) {
      alert("삭제할 항목이 없습니다.");
      return false;
    }

    var tr = document.createElement("tr");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "btn-chk");

    var td01 = document.createElement("td");
    td01.appendChild(input);
    tr.appendChild(td01);

    var td02 = document.createElement("td");

    td02.innerHTML = list[liLen].children[1].innerText;
    tr.appendChild(td02);
    document.getElementById("listBody").appendChild(tr);

    body.removeChild(list[liLen]);
  },
  delSelected: function () {
    var body = document.getElementById("done-listBody");
    var chkbox = document.querySelectorAll("#done-listBody .done-btn-chk");

    document.querySelectorAll("#done-listBody .done-btn-chk[type='checked']");

    if (chkbox.length == 0) {
      alert("복원할 항목이 없습니다.");
      return;
    }
    for (var i = 0; i < chkbox.length; i++) {
      if (chkbox[i].nodeType == 1 && chkbox[i].checked == true) {
        var tr = document.createElement("tr");
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "btn-chk");

        var td01 = document.createElement("td");
        td01.appendChild(input);
        tr.appendChild(td01);

        var td02 = document.createElement("td");

        td02.innerHTML = chkbox[i].parentNode.parentNode.children[1].innerText;
        tr.appendChild(td02);
        document.getElementById("listBody").appendChild(tr);

        // checkbox의 부모의 부모 == tr El를 삭제해준다.
        body.removeChild(chkbox[i].parentNode.parentNode);
      }
    }
  },
};
// 추가 버튼 이벤트 등록
document.getElementById("btnAdd").addEventListener("click", todoList.addList);
// document.querySelector("input.text-basic").addEventListener('keyup', todoList.addList);
// 모두 완료 버튼 이벤트 등록
document
  .getElementById("btnDelAll")
  .addEventListener("click", todoList.delAllEle);
// 마지막 엘레먼트 완료 버튼 이벤트 등록
document
  .getElementById("btnDelLast")
  .addEventListener("click", todoList.delLastEle);
// 선택 완료 버튼 이벤트 등록
document
  .getElementById("DeleteSel")
  .addEventListener("click", todoList.delSelected);

// 모두 복원 버튼 이벤트 등록
document
  .getElementById("done-btnDelAll")
  .addEventListener("click", doneList.delAllEle);
// 마지막 엘레먼트 복원 버튼 이벤트 등록
document
  .getElementById("done-btnDelLast")
  .addEventListener("click", doneList.delLastEle);
// 선택 복원 버튼 이벤트 등록
document
  .getElementById("done-DeleteSel")
  .addEventListener("click", doneList.delSelected);