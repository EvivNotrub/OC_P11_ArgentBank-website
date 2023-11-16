
import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync, writeFile } from 'fs';
// import path from 'path';
const directories = ['./src/assets/images']
const imageSizes = [
  {size: 150 , sizeName: 'xx-small'},
  {size: 304 , sizeName: 'x-small'},
  {size: 448, sizeName: 'small'},
  {size: 728, sizeName: 'small-medium'},
  {size: 1090 , sizeName: 'medium'},
  {size: 1120, sizeName: 'medium-plus'},
  {size: 1580, sizeName: 'large'},
  {size: 1920 , sizeName: 'x-large'},
  {size: 2040, sizeName: 'xx-large'},
  {size: 2410, sizeName: 'xxx-large'}
]

// const imageSizes = [
//     {size: 304 , sizeName: 'x-small'},
//     {size: 700, sizeName: 'small-medium'},
//     {size: 1090 , sizeName: 'medium'},
//     {size: 1580, sizeName: 'large'},
//     {size: 2040, sizeName: 'xx-large'}
// ]

function isFileImage(file) {
  const extensions = [ 'jpeg', 'jpg', 'png' , 'gif', 'webp', 'tiff' , 'avif' , 'raw' ]
  let validation = false;
  extensions.map( i => {
    if (file.includes(i)) {
      validation = true
    }
  })
    return validation
}

async function getMetadata(input) {
  const metadata = await sharp(input).metadata();
  return metadata
}

function addFileSizes(objectTable, Name, Sizes) {

  console.log('fire addFileSizes', ' name : ', Name);

    let fileSizes = new Object();
    fileSizes.fileName = Name;
    fileSizes.fileSizes = Sizes;
    objectTable.push(fileSizes);
}

let fileSizesRendered = [];

function changeImageSizes(){  
    directories.forEach( directory => {
      readdirSync(directory).forEach( async file => {      

        const wrongFile = isFileImage(file) ? '' : file;
        console.log(isFileImage(file), wrongFile);
        if (isFileImage(file)){
          let fileSizes = [];
          const fileName = file.replace(/\.[^/\\.]+$/, "");
          if (!existsSync(directory + '/' + fileName)){
            mkdirSync(directory + '/' + fileName);
          }
          const metadata = await getMetadata(`${directory}/${file}`);
          try {
            imageSizes.map(async format => {
              if (metadata.width >= format.size){
                await sharp(`${directory}/${file}`)
                .resize(format.size, null)
                .toFile(`${directory}/${fileName}/${fileName}-${format.sizeName}.webp`);
                fileSizes.push({'size': format.size, 'sizeName': format.sizeName})
              }
            })  
          } catch  (error){
            console.log(error);
          }

          try {
            if (metadata.width > 3000){
              await sharp(`${directory}/${file}`)
                .webp({ quality: 50 })
                .resize(3000, null)
                .toFile(`${directory}/${fileName}/${fileName}.webp`);
            } else {
              await sharp(`${directory}/${file}`)
                .webp({ quality: 50 })
                .toFile(`${directory}/${fileName}/${fileName}.webp`);
            } 
          } catch  (error){
            console.log(error);
          }

          addFileSizes(fileSizesRendered, fileName, fileSizes);
            // const sourceFile = directory + '/' + file;
            // const targetFile = directory + '/' + fileName + '/' + file;
            // fs.copyFile(sourceFile, targetFile, (err) => {
            //   if (err) throw err;
            //   console.log('File was copied to destination');
            // });
        }
        })
        console.log(fileSizesRendered);
    });

    setTimeout(() => {
      console.log(fileSizesRendered);
      const imageData = JSON.stringify(fileSizesRendered)
    
      writeFile('./src/assets/imageRenderSizes.json', imageData, function (err) {   if (err) throw err;   console.log('Fichier créé !');});
  // ./assets/imageRenderSizes.json   was  :  imageRenderSizes.json   to be tested!
    }, "10000");
}
changeImageSizes();

