# yarn 초기 설정

```
yarn init
```

# 패키지 설치

```
yarn add react react-dom react-router-dom
yarn add -D fork-ts-checker-webpack-plugin HTMLWebpackPlugin typescript @types/react @types/react-dom @types/react-router-dom tailwindcss postcss autoprefixer style-loader css-loader postcss-loader postcss-preset-env
```

webpack : webpack의 필수 패키지

webpack-cli : 커맨드라인에서 웹팩을 더 쉽게 사용할 수 있도록 다양한 명령을 제공

webpack-dev-server : 빠른 실시간 리로드를 가능하게 하는 개발 서버

html-webpack-plugin : html 파일을 템플릿으로 생성할 수 있게 해줌

typescript : TypeScript는 JavaScript의 슈퍼셋으로, 정적 타입 검사와 최신 JavaScript 기능을 제공합니다.

@types/react, @types/react-dom, @types/react-router-dom: 이 패키지들은 각각 React, ReactDOM, React Router DOM 라이브러리의 TypeScript 타입 정의를 제공합니다. 이를 통해 해당 라이브러리를 TypeScript에서 안전하게 사용할 수 있습니다.

tailwindcss: Tailwind CSS는 저수준의 유틸리티 클래스를 제공하는 CSS 프레임워크입니다. 이를 통해 디자인 시스템을 빠르게 구축할 수 있습니다.

postcss: PostCSS는 CSS를 변환하는 도구로, 다양한 플러그인을 통해 CSS를 분석하고 변환합니다.

autoprefixer: Autoprefixer는 PostCSS 플러그인으로, CSS에 자동으로 vendor prefix를 추가합니다. 이를 통해 다양한 브라우저의 호환성을 보장할 수 있습니다.

style-loader, css-loader: 이 두 로더는 Webpack에서 CSS를 처리하는 데 사용됩니다. css-loader는 CSS를 import하고, style-loader는 import된 CSS를 HTML에 삽입합니다.

postcss-loader: 이 로더는 Webpack에서 PostCSS를 처리하는 데 사용됩니다.

postcss-preset-env: 이 PostCSS 플러그인은 최신 CSS 기능을 사용할 수 있도록 해주며, 필요에 따라 이전 버전의 CSS로 변환합니다. 이를 통해 최신 CSS 문법을 안전하게 사용할 수 있습니다.

## webpack 설정

```
// webpack.config.js
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");
const paths = [
  {
    path: "/",
    lastmod: new Date().toISOString(),
    priority: 1.0,
  },
  {
    path: "/about",
    lastmod: new Date().toISOString(),
    priority: 0.8,
  },
];

module.exports = {
  entry: "./src/index.tsx",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },

  plugins: [
    new SitemapPlugin({ base: "http://localhost:3000", paths }),
    new ForkTsCheckerWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
  },
  
  resolve: {
    extensions: [".jsx", ".js", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "swc-loader",
      },
      {
        test: /\.css$/, // CSS 파일에 대한 정규식 패턴
        use: [
          "style-loader", // 스타일 태그를 생성하여 DOM에 적용
          "css-loader", // CSS를 CommonJS 모듈로 변환
          "postcss-loader", // postcss를 CSS로 컴파일
        ],
      },
    ],
  },
};

```

## 타입스크립트 설정

```
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

## SWC 설정

````
// .swcrc
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": false
    },
    "transform": {
      "react": {
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "runtime": "automatic",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false
      },
      "optimizer": {
        "globals": {
          "vars": {
            "__DEBUG__": "true"
          }
        }
      }
    }
  }
}
````
## TailwindCSS 설정
```
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
```
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
## 스크립트 코드 설정 후 실행하기
- "start": "webpack serve --mode development --open --hot"
> 이 명령어는 개발 모드에서 웹팩을 실행합니다.<br> --open 옵션은 명령어 실행 후 자동으로 브라우저를 열어주며, --hot 옵션은 코드 변경 시 자동으로 리로드하는 HMR(Hot Module Replacement) 기능을 활성화합니다.<br> 이 명령어를 실행하면 개발 서버가 시작되고, 코드 변경 사항이 실시간으로 반영됩니다.
- "build": "webpack --mode production"
> 이 명령어는 프로덕션 모드에서 웹팩을 실행하여 최적화된 빌드를 생성합니다. 이 명령어를 실행하면 최적화와 미니파이(minify) 과정을 거친 결과물이 출력 디렉토리(기본적으로 dist 디렉토리)에 생성됩니다.
```
// package.json
{
  "name": "react-webpack-swc-typescript-tailwindcss",
  "author": "Joon Park",
  "version": "1.0.0",
  "main": "index.tsx",
  "license": "MIT",
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.19.0"
  },
  "devDependencies": {
    "@swc/cli": "^0.1.59",
    "@swc/core": "^1.3.27",
    "@types/react": "^18.2.38",
    "@types/react-dom": "^18.2.16",
    "@types/react-router-dom": "^5.3.3",
    "autoprefixer": "^10.4.16",
    "css-loader": "^6.8.1",
    "fork-ts-checker-webpack-plugin": "^9.0.2",
    "html-webpack-plugin": "^5.5.0",
    "postcss": "^8.4.31",
    "postcss-loader": "^7.3.3",
    "postcss-preset-env": "^9.3.0",
    "style-loader": "^3.3.3",
    "swc-loader": "^0.2.3",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.3.2",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  }
}
```