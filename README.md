# convert-images-webp

## commands

### install

```
yarn
```

or 

```
npm i
```

### webpに変換

※ルートディレクトリで実行  
実行後、 `src/images/webp` のディレクトリが生成されます。

```
yarn convert-webp
```

or 

```
npm run convert-webp
```


## directories, files

```
├── LICENSE
├── README.md
├── node-extensions
│   └── convert-webp.ts  -> 変換用スクリプト
├── package.json
├── src
│   ├── images
│   │   └── original     -> 元画像のディレクトリを格納
│   │       └── xxx      -> jpg または png画像を入れるディレクトリ。名前は任意。
│   └── scripts
│       └── index.ts     -> サンプルスクリプト
└── tsconfig.json
```

外部から `import` したい場合は `src/scripts/index.ts` を参照。
