# Nuxt3 ESLINT & PRETTIER Minimal Starter

## 세팅 방법 (소스)

```bash

# NUXT 기반 eslint & prettier 모듈 및 플러그인 설치

npm i -D @nuxtjs/eslint-config-typescript @nuxtjs/eslint-module @typescript-eslint/eslint-plugin @typescript-eslint/parser

npm i -D eslint prettier typescript eslint-config-airbnb-base eslint-config-prettier eslint-plugin-nuxt eslint-plugin-prettier eslint-plugin-vue

*package.json 의 devDependencies 리스트 복사 후 npm install 해도 무방

# eslint 설정 파일 생성 및 내용 삽입
.eslintrc.cjs

# prettier 설정 파일 생성 및 내용 삽입
.prettierrc

# nuxt.config.ts 파일 내 모듈 등록
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [['@nuxtjs/eslint-module', {}]],
});

# .vscode 폴더 내 settings.json 파일 수정

```

## 세팅 방법 (VSCODE)

```bash
# 1. formatter 설정 : 컨트롤(커멘트) + , 로 진입 후 prettier 로 설정
# 2. 컨트롤(커멘트) + , 로 진입 후 'Code Actions On Save' 입력 후 '텍스트 편집기 탭 클릭' -> setting.json 들어가서 수정
"editor.codeActionsOnSave": {
        "source.fixAll":true
    },

```
