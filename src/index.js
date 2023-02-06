import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function getGIF(searchTerm) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=10&offset=0&rating=pg-13&lang=en`;

  request.addEventListener('loadend', function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      displayElements(response, searchTerm);
    } else {
      printError(this, response, searchTerm);
    }
  })

  request.open('GET', url, true);
  request.send();
}

function getTrending(){
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=10&rating=r`

  request.addEventListener('loadend', function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      displayElements(response)
    } else {
      printError(this, response);
    }
  })
  request.open('GET', url, true);
  request.send();
}

function getRandom() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=r`

  request.addEventListener('loadend', function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      displayElements(response)
    } else {
      printError(this, response);
    }
  })
  request.open('GET', url, true);
  request.send();
}

function uploadGIF(file, tags) {
  let request = new XMLHttpRequest();
  const url = `upload.giphy.com/v1/gifs?api_key=${process.env.API_KEY}&file=${file}&tags=${tags}`

  request.addEventListener('loadend', function() {
    const response = JSON.parse(this.responseText);
    if (this.status===200) {
      displayUploadSuccess(response);
    } else {
      printError(this, response);
    }
  });

  request.open('GET', url, true);
  request.send();
} 

//////////////////////////////////////////

function printError(request, response, searchTerm) {
  document.getElementById('showResponse').innerText = `You dun messed up bro. Your search for ${searchTerm}, returned an error of ${request.status} ${request.statusText}`;
}

function displayUploadSuccess(response) {
  debugger;
}


function displayElements(parsedResponse, searchTerm) {
  document.getElementById('showResponse').innerHTML = null;

  if (parsedResponse.data[1]) {
    parsedResponse.data.forEach(element => {
      let div = document.createElement('div')
      div.setAttribute('class', 'imageResult')
      div.innerHTML += `<img src='${element.images.downsized.url}'>${element.title}`;
      document.getElementById('showResponse').append(div)
    })
  } else {
    let div = document.createElement('div')
    div.setAttribute('class', 'imageResult')
    div.innerHTML = `<img src= '${parsedResponse.data.images.original.url}'>${parsedResponse.data.title}`;
    document.getElementById('showResponse').append(div);
  }
}

function handleFormSubmission(event){
  event.preventDefault();
  const searchTerm = document.getElementById('searchTerm').value;
  document.querySelector('#searchTerm').value = null;
  if (event.target.id === 'trending') {
    getTrending();
  } else if (event.target.id === 'random') {
    getRandom();
  } else {
    getGIF(searchTerm);
  }
}

function handleUploadRequest(event) {
  event.preventDefault();
  const file = document.getElementById('upload').value;
  const tags = document.getElementById('tags').value;
  document.querySelector('#uploadForm').reset();
  uploadGIF(file, tags);
}


document.querySelector('form').addEventListener('submit', handleFormSubmission);
document.querySelector('button#trending').addEventListener('click', handleFormSubmission);
document.querySelector('button#random').addEventListener('click', handleFormSubmission);
document.querySelector('form#uploadForm').addEventListener('submit', handleUploadRequest);
