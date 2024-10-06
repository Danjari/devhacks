import searchYoutube from 'youtube-api-v3-search';

const options = {
    q:'how to concatenate a string',
    part:'snippet',
    type:'video'
}

async () => {
    let result = await searchYoutube(process.env.YOUTUBE_API_KEY,options);
    console.log(result);
  }