import fs from 'fs'
import glob from 'glob'
import mkdirp from 'mkdirp'
import path from 'path'
import sharp from 'sharp'
const fsPromise = fs.promises

enum FileExtensions {
  jpg = 'jpg',
  png = 'png'
}

interface Options {
  originalImageDirectory: string
  webpImageDirectory: string
  resizeWidth?: number | null
  imageQuality?: number | null
}

const convertImagesWebp = (options: Options): void => {
  const ORIGINAL_IMG_DIR: Array<string> = glob.sync(options.originalImageDirectory)
  const IMG_DIR_ARRAY: Array<string> = ORIGINAL_IMG_DIR.map(imgDirPath => imgDirPath.split('/', ORIGINAL_IMG_DIR[0].split('/').length-1)[ORIGINAL_IMG_DIR[0].split('/').length-2])
  const WEBP_IMG_DIR: string = options.webpImageDirectory
  const WEBP_IMG_DIR_ARRAY: Array<string> = IMG_DIR_ARRAY.map((name) => WEBP_IMG_DIR + name)
  const RESIZE_WIDTH: number | null = options.resizeWidth

  const changeWebpImages = (imgPath: string, outputDir: string, outputFilePath: string): void => {
    const fileName: string = outputFilePath.split('/').reverse()[0]
    const imgName: string = fileName.split('.')[0]
    const fileExtension: string = fileName.split('.')[1]

    if ( !imgName ) {
      return
    }

    if ( !(fileExtension === FileExtensions.jpg || fileExtension === FileExtensions.png) ) {
      console.log('jpgまたはpngで実行')
      return
    }

    sharp(imgPath)
      .webp({
        quality: options.imageQuality
      })
      .resize(RESIZE_WIDTH)
      .toFile(`${outputDir}${imgName}.webp`, (err) => {
        if ( err ) {
          console.log(fileName)
          console.error(err)
          return
        }
      })
  }

  const createWebDir = async (): Promise<void> => {
    WEBP_IMG_DIR_ARRAY.forEach((pathName: string) => {
      mkdirp.sync(pathName)
    })
  }

  const writeFiles = async (): Promise<void> => {
    ORIGINAL_IMG_DIR.forEach((dirName, i) => {
      const resolvedPath = path.resolve(dirName)
      fsPromise.readdir(resolvedPath)
        .then((files) => {
          files.forEach((file) => {
            changeWebpImages(`${resolvedPath}/${file}`, `${path.resolve(WEBP_IMG_DIR_ARRAY[i])}/`, `${path.resolve(WEBP_IMG_DIR_ARRAY[i])}/${file}`);
          })
        })
        .catch((err) => {
          console.error(err.message)
          return
        })
    })
  }

  const init = async (): Promise<void> => {
    await createWebDir()
    await writeFiles()
  }

  init()
}

export default convertImagesWebp
