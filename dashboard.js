const userGreeting = document.getElementById('userGreeting');
const logoutBtn = document.getElementById('logoutBtn');
const publishForm = document.getElementById('publishForm');
const previewContent = document.getElementById('previewContent');
const publishedList = document.getElementById('publishedList');

const currentUser = localStorage.getItem('wikiJogosUser');
if (!currentUser) {
  window.location.href = 'index.html';
} else {
  userGreeting.textContent = `Olá, ${currentUser}`;
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('wikiJogosUser');
  window.location.href = 'index.html';
});

publishForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('postTitle').value.trim();
  const text = document.getElementById('postText').value.trim();
  const image = document.getElementById('postImage').value.trim();
  const link = document.getElementById('postLink').value.trim();

  if (!title || !text) {
    previewContent.innerHTML = '<p>Por favor, adicione pelo menos um título e um texto para publicar.</p>';
    return;
  }

  const post = {
    title,
    text,
    image,
    link,
    author: currentUser,
    createdAt: new Date().toLocaleString('pt-BR'),
  };

  addPublishedPost(post);
  savePost(post);
  showPreview(post);
  publishForm.reset();
});

function showPreview(post) {
  const imageHtml = post.image ? `<img src="${post.image}" alt="Imagem da publicação">` : '';
  const linkHtml = post.link ? `<p><a href="${post.link}" target="_blank" rel="noopener">Link externo</a></p>` : '';

  previewContent.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.text}</p>
    ${imageHtml}
    ${linkHtml}
    <p><small>Autor: ${post.author}</small></p>
  `;
}

function addPublishedPost(post) {
  const postElement = document.createElement('div');
  postElement.className = 'published-post';
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.text}</p>
    ${post.image ? `<img src="${post.image}" alt="Imagem da publicação">` : ''}
    ${post.link ? `<p><a href="${post.link}" target="_blank" rel="noopener">${post.link}</a></p>` : ''}
    <p><small>Autor: ${post.author} • ${post.createdAt}</small></p>
  `;

  publishedList.prepend(postElement);
}

function savePost(post) {
  const posts = JSON.parse(localStorage.getItem('wikiJogosPosts') || '[]');
  posts.unshift(post);
  localStorage.setItem('wikiJogosPosts', JSON.stringify(posts));
}

function loadPublishedPosts() {
  const posts = JSON.parse(localStorage.getItem('wikiJogosPosts') || '[]');
  posts.forEach(addPublishedPost);
}

loadPublishedPosts();
