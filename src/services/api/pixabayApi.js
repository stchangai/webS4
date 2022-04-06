export async function getImageRandom(axios) {
  const image = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg&count=2`);
  return image;
}
export async function getQuestion(axios, id) {
  const question = await axios.get(`api/question/${id}`)
  return question
}

export async function getImagesByKeywords(axios, keywords, colors) {
  console.log(keywords, colors)
  let labelColor;
  if (colors == '') {
    // colors = 'white';
    labelColor = ''
  } else {
    labelColor = '&color='
  }
  const images = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg&query=` +
      keywords + labelColor + colors + `&per_page=20`);
  // console.log(images);
  // let selectedImages = GetASelectionFromArray(images, 5);
  // console.log('hello ', selectedImages);
  return images;
}

// async function GetASelectionFromArray(images, limitOfImages) {
//   let randomArray = [];
//   let selectedImages = [];
//   let found = -1;
//   for (let i = 0; i < limitOfImages; i++) {
//     let rand = Math.floor(Math.random() * 10 + 1);
//     console.log(rand)
//     found = randomArray.find(element => element == rand);
//     if (found > 0) {
//       i--
//     } else {
//       randomArray.push(rand);
//     }
//   }
//   console.log(randomArray)
//   console.log('essai = ', images[1])
//   for (let i = 0; i < randomArray.length - 1; i++) {
//     selectedImages[i] = images[randomArray[i]]
//   }
//   console.log(selectedImages)
//   // randomArray.forEach(
//   //     (index, element) => selectedImages[index] = images[element])
//   return selectedImages
// }