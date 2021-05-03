import convertImagesWebp from '../../node-extensions/convert-webp'

const options = {
  originalImageDirectory: 'src/images/original/*/',  // 元画像を入れるディレクトリ ※必須
  webpImageDirectory: 'src/images/webp/',            // webp画像を入れるディレクトリ ※必須
  resizeWidth: 1200,                                 // リサイズするサイズ(px)
  imageQuality: 100                                  // 画像クオリティ(0〜100)
}

convertImagesWebp(options)
