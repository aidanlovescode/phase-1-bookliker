document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector('ul#list');
    const details = document.querySelector('div#show-panel');
  
    fetch('http://localhost:3000/books')
      .then((res) => res.json())
      .then((res) => {
        res.forEach((book) => {
          const li = document.createElement('li');
          li.innerText = book.title
          li.addEventListener('click', (e) => {
            bookDetails(book.id)
          })
          list.appendChild(li);
        })
      })
  
    function bookDetails(id) {
      fetch(`http://localhost:3000/books/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const users = res.users.map((user) => `<li>${user.username}</li>`).join('')
          details.innerHTML = `
            <img src="${res.img_url}" />
            <h1>${res.title}</h1>
            <h2><em>${res.subtitle || ""}</em></h2>
            <p>Author: ${res.author}</p>
            <p>${res.description}</p>
            <ul id="liked-by">${users}</ul>
          `
  
          const likedByUser = res.users.some((user) => user.username === 'ann')
  
          const button = document.createElement('button');
          button.innerText = likedByUser ? 'UNLIKE' : 'LIKE'
          button.addEventListener('click', (e) => handleButtonClick(res.id, res.users));
  
          details.appendChild(button);
        })
    }
  
    function handleButtonClick(id, users) {
      const likedByUser = users.some((user) => user.username === 'ann')
  
      if (!likedByUser) {
        users.push({
          "id": 4, "username": "ann"
        });
      } else {
        // UNLIKE
      }
  
      fetch(`http://localhost:3000/books/${id}`, {
        method: 'PATCH',
        headers: {
          "content-type": 'application/json',
          accepts: 'application/json'
        },
        body: JSON.stringify({ users })
      })
    }
  });
