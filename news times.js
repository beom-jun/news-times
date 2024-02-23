document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
});

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };

const API_KEY = `d442e5b521b24b44b3eff15add9db6bd`;
let newslist=[];
const menus =document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getnewsbycategory(event)))

let url = new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`)

let getnews =async ()=>{

    try{

    const response =await fetch(url);
    
    const data = await response.json();
    
        if(response.status===200){      //status가 200이면 웹이 정상작동
            if(data.articles.length===0){
                throw new Error("No Result For This Search");
            }
            newslist = data.articles;
            render();
        }else{
            throw new Error(data.message)
        }

    }catch(error){
        errorRender(error.message) //밑에 errorRender를 호출 할 때 마다 error.message를 보여줌
    }

};


const getLastesnews = async ()=>{
    url=new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`

    ); 
    getnews();
};

const getnewsbycategory=async (event)=>{
     const category = event.target.textContent.toLowerCase();
    console.log("category",category);
    url = new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`

    );
    getnews();
};

const searchNews=async ()=>{
    const keyword = document.getElementById("search-input").value
    console.log(keyword);
    url = new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
    );
    getnews();
}

const render=()=>{
    const newshtml = newslist.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="newsimg-size"
            src="${news.urlToImage || "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}" />
    </div>

    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description == null || news.description ==""
            ?"내용 없음"
            :news.description.length > 200
            ?news.description.substring(0,200) + "..."
            :news.description
        }
        </p>
        <div>
            ${news.source.name || "No Soucre"} * ${moment(news.publishedAt).startOf('hour').fromNow()}
        </div>
    </div>
</div>`
)

.join("");


    document.getElementById("news-board").innerHTML=newshtml
}

const errorRender=(errorMessage)=>{
   const errorHtml = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML=errorHtml //에러가 발생하면 에러 메시지를 뉴스를 보여주는 곳에서 보여줌 
}

getLastesnews();



//enter키 입력
let input = document.getElementById("search-input");

    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button-enter").click();
      }
    });
