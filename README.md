brㅠ[![Netlify Status](https://api.netlify.com/api/v1/badges/cdb6931f-dbbb-4989-91e2-2793aff8acdb/deploy-status)](https://app.netlify.com/sites/todolist-vanilla/deploys)

# **📒Todolist-app**

> HTML, CSS, Javascript 로 이것 저것 다 해보는 곳 🧪
> Back to the basic!

**[netlify로 연결해봤다](https://todolist-vanilla.netlify.app/)**(돈나가는 건 아니겠지? 믿는다 미국~!)

### **욕심 나열**

- [ ] todolist 단순 로직
- [ ] event loop 이해
- [ ] webpack, babel-loader
- [ ] SCSS
- [ ] validation check
- [ ] drag & drop
- [ ] vue
- [ ] server 구현
- [ ] 반응형, grid system
- [ ] progress bar
- [ ] functional 강의 들은 거 적용해서 util성 library 비스무리한거 만들어보기
- [ ] sign in, sign up
- [ ] theme (라섹남 나를 위한 dark 모드)
- [ ] react
- [ ] typescript
- [ ] AWS
- [x] npm 적용

---

</br>
</br>

## **00.todolist_vanilla**

> `DOM API`

- 누군가 사용했던 html, css을 빌려서 단순히 totolist app 로직을 위한 javascript 연습(출처를 찾아내자...)
- DOM api 를 연습에 집중

</br>

## **01.todolist_vanilla_publishing**

> `HTML`,` CSS`, `DOM API`

- 0년차 개발자, 업무 진행 중 생각보다 많은 시간이 소요되는 곳은 css와 HTML이었다.

  (왜 padding 살짝만 바꿔도 전체 구조가 깨지는 걸까?)

- 사내에서는 심지어 CSS pre-procesor, SCSS를 사용하지만, 제대로 알고 사용하는 것이 아닌, 원하는 속성을 가진 class명을 가져다 쓰는 수준이었다.

- HTML과 css 에 대한 이해가 너무나도 없는 것 같아서, 직접 디자인하고, 구조를 짜며, 퍼블리싱 연습을 해야겠다고 생각했다.

- 요즘 핫한 **Figma**를 사용해 디자인을 진행 보았다. **([Figma 결과물](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F31hfwsgOtsvI8pyS9ZfTVQ%2Ftodolist-vanilla%3Fnode-id%3D1%253A95))**

  (기존에 adobe inllustrator와 photoshop을 다룰 줄 알았기 때문에, 생각보다는 재밌었다. 그치만, HTML, CSS 출력은 왜 안되는 걸까... 궁금한데... 내 직업을 사라지게 할 것만 같은 기술.. 직접 보고파!)

</br>

## **>> 02.todolist_vanilla_npm_parcel**

> `npm`, `netlify`, `parcel-bundler`

- webpack, npm, package, build, barbel, compile, css pre-processor 등... FE 생태계를 사용만 하지, 직접 세팅하고 공부할 생각을 못했다.
- 이제 더는 ... vsCode live-server로 서버를 올리지 않아!
- 구경꾼들을 위해 ... 보는 사람도 없겠지만, 사실 지하철에서 괜히 폰으로 켜서 자기만족을 하기 위해 **netlify**로 배포해보았다. 나만 보겠지... 오히려 안심.
- npm 은 알았는데, nvm은 몰랐다. java의 경우, 로컬 버전은 jenv 로 따로 관리했지만, node.js는 더 편리한 것 같다.
- parcel-bundler를 사용해 dev server를 열었다.
  그 package.json에 있는 script에 run dev를 직접 써보니까 괜히 개발자가 된 것 같아서 좋았다.
- git에 대해 많은 공부가 되는 것 같다. `.gitignore` 설정(node_modules, dist 나가!)
- HTML5 의 **`data-` attribute**에 대해 알게되었다.

  CSS class 로만 element들에게 의미를 부여했던 과거와 달리, 이걸 알아버린 나는 좀 더 편하게 element들을 다룰 수 있겠다고 생각에 가슴이 설레었다.

- CSS에 `:root{}` 등으로 **변수 처리**를 할 수 있다는 사실에 충격. 삶의 질이 높아졌다.
