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


function printError(request, response, searchTerm) {
  document.getElementById('showResponse').innerText = `You dun messed up bro. Your search for ${searchTerm}, returned an error of ${request.status} ${request.statusText}`;
}

function displayElements(parsedResponse, searchTerm) {
  parsedResponse.data.forEach(element => {
    document.getElementById('showResponse').innerHTML += `<img src='${element.images.original.url}'>`
  })
}

function handleFormSubmission(event){
  event.preventDefault();
  const searchTerm = document.getElementById('searchTerm').value;
  document.querySelector('#searchTerm').value = null;
  getGIF(searchTerm);
}

document.querySelector('form').addEventListener('submit', handleFormSubmission);
