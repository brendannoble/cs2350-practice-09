require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// JavaScript
import 'bootstrap';

const displayCards = () => {
  let cards = JSON.parse(localStorage.getItem('cards') || '[]');
  document.querySelector('#cards').innerHTML = '';
  for (let c of cards) {
    let col = document.createElement('div');
    col.setAttribute('class', 'col-md-4')
    col.innerHTML = displayCard(c);
    document.querySelector('#cards').appendChild(col);
  }

  document.querySelectorAll('button.btn-danger').forEach((b) => {
    b.onclick = (e) => {
      let cards = JSON.parse(localStorage.getItem('cards') || '[]');
      let index = -1
      for (let i in cards) {
        if(cards[i].title === e.target.closest('.card').dataset.title) {
          index = i;
          break;
        }
      }
      if (index != -1) {
        cards.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(cards));
        location.reload();
      }
    } 
  });
}

const displayCard = (c) => {
  return `
  <div class="card" data-title="${c.title}">
    <img src="${c.poster}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${c.title}</h5>
      <p class="card-text">${c.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>
  `
}

function addNewCard(e) {
  if (e) e.preventDefault();
  let t = document.querySelector('#title').value
  let d = document.querySelector('#description').value
  let p = document.querySelector('#poster').value

  let cards = JSON.parse(localStorage.getItem('cards') || '[]');

  if (t && d && p) {
    let card = {title: t, description: d, poster: p};
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  this.reset();

  document.querySelector('#myForm').classList.toggle('d-none');
  document.querySelector('#cards').classList.toggle('d-none');

  displayCards();
}

document.querySelector('#new_card').onclick = () => {
  document.querySelector('#myForm').classList.toggle('d-none');
  document.querySelector('#cards').classList.toggle('d-none');
}

document.forms[0].querySelector('[type="button"]').onclick = () => {
  document.querySelector('#myForm').classList.toggle('d-none');
  document.querySelector('#cards').classList.toggle('d-none');
}

document.forms[0].addEventListener('submit', addNewCard, false);
displayCards();