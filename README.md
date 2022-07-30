お手本にするプログラムhttps://codesandbox.io/s/compound-react-components-with-hooks-typescript-vpvdq?file=/src/Tabs/Tabs.tsx

練習の目的 React compound pattern を習得すること．
よって，関係ないファイルについてはコピペする

プログラム記述メモ
Tabs.tsx のメモ
・プロバイダーパターンを使用している(createContext, Context.Provider value = context)
・useTabs を Tabs で宣言し，実装している
・useMemo でコンテキストの変化を監視している
・Tabs.xxxx でアクセスできるようにしている
・setActiveTab
・activeTab を useTabs で利用できるようにしている．
全体メモ
・label の値で切り替える

プログラム仕様メモ
ディレクトリ構造

- src
  - Tabs
    - index.tsx
    - Panel.tsx
    - Tab.tsx
    - Tabs.tsx

index.html

<!DOCTYPE html>
<html lang="en">
 
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <!--
     manifest.json provides metadata used when your web app is added to the
     homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
   -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  <!--
     Notice the use of %PUBLIC_URL% in the tags above.
     It will be replaced with the URL of the `public` folder during the build.
     Only files inside the `public` folder can be referenced from the HTML.
 
     Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
     work correctly both with client-side routing and a non-root public URL.
     Learn how to configure a non-root public URL by running `npm run build`.
   -->
  <title>React App</title>
</head>
 
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
  <!--
     This HTML file is a template.
     If you open it directly in the browser, you will see an empty page.
 
     You can add webfonts, meta tags, or analytics to this file.
     The build step will place the bundled scripts into the <body> tag.
 
     To begin the development, run `npm start` or `yarn start`.
     To create a production bundle, use `npm run build` or `yarn build`.
   -->
</body>
 
</html>

style.css
button {
margin-bottom: 20px;
min-width: 150px;
}

.App {
font-family: sans-serif;
text-align: center;
padding: 50px 25px;
}

.tab {
display: inline;
margin: 0 10px;
}

index.tsx
import \* as React from 'react';
import { render } from 'react-dom';
import { Tabs } from './Tabs';

import './styles.css';

function App() {
return (

   <div className="App">
     <Tabs>
       {/* Group of tabs */}
       <Tabs.Tab label="a">Tab A</Tabs.Tab>
       <Tabs.Tab label="b">Tab B</Tabs.Tab>
       <Tabs.Tab label="c">Tab C</Tabs.Tab>
 
       {/* Tab panels */}
       <Tabs.Panel label="a">
         This is tab A{' '}
         <span role="img" aria-label="Rocket ship">
           🚀
         </span>
       </Tabs.Panel>
       <Tabs.Panel label="b">
         This is tab B{' '}
         <span role="img" aria-label="Diamond">
           💎
         </span>
       </Tabs.Panel>
       <Tabs.Panel label="c">
         This is tab C{' '}
         <span role="img" aria-label="Ghost">
           👻
         </span>
       </Tabs.Panel>
     </Tabs>
   </div>
 );
}
 
const rootElement = document.getElementById('root');
render(<App />, rootElement);

# 再現メモ復元学習をやった学びめも

- createContext では，createContext<interface | null>とするが，その後に Provider を戻り値に含めるコンポーネントでは必ず interface の値を useState の値から memo 化をおこなってから Provider に受け渡すので null が渡ってしまうことはない．また，useXXXX 　の実装で null が戻り値に含まれないようにガードするため，null の影響は実質的に外部のコンポーネントに伝わってしまうことがない．だから，createContext の使用では初期化の値として null を入力しても問題がない．ではなぜ，null を渡す必要があるのかについては，useXXXX の実装を行いたいから，コンポーネントの外側で createContext を行う必要があるため，外では null を渡すしかないのだと考えられる．
- お手本にしたコードはどうやら利用した React のバージョンと異なっており，FC 型で children が付与されているようだが，本環境では FC でプロップスを包み込んだだけでは children は付与されない．なので，PropsWithChildren で型を拡張する必要がある
- createcontext は XXXX.Provider とセットで利用する
- Tabs.Tab, Tabs.Panel とするために，それぞれの interface を定義して&で混ぜて，その実態を代入してあげることで，<Tabs.Tab>というような形でコンポーネントを公開できるようになる．まとまった，グループの要素なのだということが強調される点がイケてる
- 上記を行うために interface を定義する
