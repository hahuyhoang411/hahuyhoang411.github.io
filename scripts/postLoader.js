document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.querySelector('.posts');

    if (postsContainer) {
        fetch('./data/posts.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(posts => {
                postsContainer.innerHTML = ''; // Clear any existing content (e.g., placeholders)
                posts.forEach(post => {
                    const postCard = document.createElement('article');
                    postCard.classList.add('post-card');

                    let tagsHTML = '';
                    if (post.tags) {
                        tagsHTML = `
                            <div class="topic-tags">
                                ${post.tags.topic ? `<a href="${post.tags.topicLink}" class="topic-tag">${post.tags.topic}</a>` : ''}
                            </div>
                            ${post.tags.series ? `<a href="${post.tags.seriesLink}" class="series-tag">${post.tags.series}</a>` : ''}
                        `;
                    }

                    postCard.innerHTML = `
                        <img src="${post.image}" alt="${post.altText}" class="post-image">
                        <div class="post-content">
                            <div class="post-meta">
                                <time class="post-date">${post.date}</time>
                                <div class="tag-container">
                                    ${tagsHTML}
                                </div>
                            </div>
                            <h2>
                                <a href="${post.link}" class="post-title">
                                    ${post.title}
                                </a>
                            </h2>
                            <p class="post-description">${post.description}</p>
                        </div>
                    `;
                    postsContainer.appendChild(postCard);
                });
            })
            .catch(error => {
                console.error('Error fetching or processing posts:', error);
                postsContainer.innerHTML = '<p>Error loading posts. Please try again later.</p>';
            });
    }
}); 