export async function getImageRandom(axios) {
  const image = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg&count=2`);
  return image;
}

export async function getImagesByKeywords(axios, keywords, colors) {
  let labelColor;
  if (colors == '') {
    labelColor = ''
  } else {
    labelColor = '&color='
  }
  const images = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg&query=` +
      keywords + labelColor + colors + `&per_page=20`);
  return images;
}

export async function GetAllImages(axios, pageCount = 1, orderBy = 'popular') {
  const allImages = await axios.get(
      `https://api.unsplash.com/photos?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg&per_page=12&page=` + pageCount + `&order_by=` + orderBy);
  return allImages.data;
}