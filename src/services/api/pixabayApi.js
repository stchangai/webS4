export async function getImageRandom(axios) {
  const image = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=QCpQmMd34xHiP1qm3UlvbOFySNj3GamhpHOCxVwUurg&count=2`);
  return image;
}
export async function getQuestion(axios, id) {
  const question = await axios.get(`api/question/${id}`)
  return question
}