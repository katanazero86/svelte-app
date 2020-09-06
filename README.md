# Svelte todo app

---

> ### todo app 소개 <br/>
> Svelte, Moment.js, Firebase, Rollup, PostCSS, HTML5, CSS3, Tailwind CSS
> - Owner & Maintainer
> - github. [https://github.com/katanazero86/vue-weather-v2](https://github.com/katanazero86/vue-weather-v2)
> - [sveltejs/template](https://github.com/sveltejs/template) 을 이용하여 rollup 번들러를 사용하는 초기 프로젝트 생성, Svelte 를 이용하여 Todo 웹앱 제작 및 Vercel 배포
> - Todo 를 추가하면, 제목과 내용을 작성하고 기한일 선택 후 저장 합니다. Todo 는 firebase 에 저장되며, 실시간으로 업데이트된 내용을 조회해와 목록을 출력합니다.

---

> ### project 정보 <br/>
> - [sveltejs/template](https://github.com/sveltejs/template) 을 이용하여 rollup 번들러를 사용하는 초기 프로젝트 생성
> - 추가 모듈 설치 및 구성
> ```
> npm i --save firebase
> npm i --save moment moment-timezone
> npm i --save-dev svelte-calendar tailwindcss autoprefixer
> 기타 : rollup-plugin-livereload rollup-plugin-postcss 등 필요한 모듈 설치 
> ```
> - 프로젝트 실행방법(execution)
> ```
> node moudle install : npm i or npm install
> dev : npm run dev
> build : npm run build
> ```

---

> ### project 배포(deploy) <br/>
> - https://vercel.com/ - 버셀 클라우드 플랫폼을 이용하여 배포
> - 버셀 가입 후, github 저장소 연동
> - https://svelte-app-delta.now.sh/

---

> ### 구조 및 규약

```
/src/main.js : Svelte 의 시작점(App.svelte 를 가져와서 App 인스턴스 생성 후, DOM 에 마운트 합니다.)
/src/rollup.confug.js : rollup 번들러 설정 및 entry point 를 등록(main.js)
/src/firebase.js : google firebase 연동을 위한 설정과 초기화 코드
/src/components : Svelte 컴포넌트를 관리하는 폴더


- 컴포넌트(*.svelte)명은 대문자로 시작
- 초기화된 firebase 의 firestore 변수명은 FIREBASE_DB 
- module 패턴으로 작성된 코드는 *Module 로 표기
- on:eventname 인 부분은 이벤트 바인딩이며, bind:property 부분은 속성에 값을 바인딩 합니다.
- const dispatch = createEventDispatcher(); 를 활용하여 컴포넌트에 전달된 이벤트를 수신합니다.

```
