const tags = ['cendol', 'malaysia', 'singapore', 'city']

const list = document.getElementById('list-data')
const answerList = document.getElementById('choices')
let answer = ""
let masonry = new Masonry(list, {
  itemSelector: 'li',
});


function randomColor(){
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return rgb(' + r + ',' + g + ',' + b ')
}

function reset(){
  answerList.innerHTML = "";
  answer = tags[Math.floor(Math.random() * tags.length)]
  getTaggedPhotos(answer);

  const choices = [];
  choices.push(answer);

  while(choices.length < 4){
    const rand = tags[Math.floor(Math.random() * tags.length)]
    if(choices.indexOf(rand) == -1){
      choices.push(rand);
    }
  }

  choices.sort(function(){
    return Math.random() * 2 - 1;
  });

  for(let i = 0; i < choices.length; i++){
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.appendChild(btn)
    btn.innerHTML = choices[i]
    btn.style.backgroundColor = randomColor();
    btn.onclick = function(){
      if(btn.innerHTML == answer){
        window.alert('you are right!')
    }
    else{
      window.alert('sorry! the answer is ' + answer)
    }

    reset();
  }
  answerList.appendChild(li)


}

function getTaggedPhotos(tagName){
  fetch('https://api.tumblr.com/v2/tagged?tag=' + tags + '&api_key=suGgXr7s6qn2vewa0rsD9VSRUyRA2Haumf3CP2BYETcLOGCUVC')
  .then(function(response){
    return response.json();
  })
  .then(function(result){

    // clear list
    list.innerHTML = '';

    const items = result.response;

    for(let i = 0; i < items.length; i++){
      const item = items[i];

      if(item.photos != undefined){
        const altSizes = item.photos[0].alt_sizes
        const imgSrc = altSizes[altSizes.length - 3]

        const img = document.createElement('img');
        img.src = imgSrc;

        const li = document.createElement('li');
        li.appendChild(img);

        // li.innerHTML = imgSrc;

        list.appendChild(li);
      }
    }

  })
}



reset()