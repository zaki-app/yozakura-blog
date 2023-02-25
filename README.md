# Yozakura Blog

技術系のブログを書こうと思っております😷

Front...Next.js
Back...Lambda(Node.js)
DB...DynamoDB
hosting...Amplify(SSR)

```
yarn build
yarn dev
```

## ページ構成
|  エンドポイント  |  レンダリング  |
| ---- | ---- |
|  /  |  ISR  |
|  /articles/[id]  |  SG  |


リダイレクト設定すればISRで行けるかも  
https://zenn.dev/jaga/articles/redirect-settings-automation-on-amplify-hosting