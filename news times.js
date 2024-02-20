const API_KEY = `d442e5b521b24b44b3eff15add9db6bd`;
let news=[];

const getLastesnews = async ()=>{
    const url=new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=us&apiKey=${API_KEY}`
    ); 
    const response =await fetch(url);
    const data = await response.json()
    news = data.articles
    console.log("rrr",news)
};



getLastesnews();
