async function renderPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postName = urlParams.get('post');
    
    const postContainer = document.querySelector('.post-container');
    const contentElement = document.querySelector('.post-content');
    const spinner = document.querySelector('.loading-spinner');

    if (!postName) {
        if (contentElement) contentElement.innerHTML = '<p>Post not specified.</p>';
        return;
    }

    if (!contentElement || !postContainer) {
        console.error('Required post template elements not found.');
        return;
    }

    if (spinner) spinner.style.display = 'block';
    // Hide actual content display parts until loaded
    postContainer.style.visibility = 'hidden'; 

    try {
        const response = await fetch(`../posts/${postName}.md`);
        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
        }
        const markdownContent = await response.text();
        
        const frontMatter = parseFrontMatter(markdownContent);
        if (!frontMatter) {
            throw new Error('Could not parse front matter from post.');
        }
        
        document.title = `${frontMatter.title || 'Blog Post'} - Study AI with Rex`;

        const dateElement = document.querySelector('.post-date');
        if (dateElement) dateElement.textContent = frontMatter.date || '';
        
        const topicElement = document.querySelector('.topic-tag');
        if (topicElement) {
            if (frontMatter.topic && frontMatter.topicSlug) {
                topicElement.textContent = frontMatter.topic;
                topicElement.href = `/topics/${frontMatter.topicSlug}`;
                topicElement.style.display = 'inline-flex';
            } else {
                topicElement.style.display = 'none';
            }
        }
        
        const seriesTag = document.querySelector('.series-tag');
        if (seriesTag) {
            if (frontMatter.series && frontMatter.seriesSlug) {
                seriesTag.textContent = frontMatter.series;
                seriesTag.href = `/series/${frontMatter.seriesSlug}`;
                seriesTag.style.display = 'inline-flex';
            } else {
                seriesTag.style.display = 'none';
            }
        }
        
        const titleElement = document.querySelector('.post-title');
        if (titleElement) titleElement.textContent = frontMatter.title || 'Post Title Unavailable';
        
        const descriptionElement = document.querySelector('.post-description');
        if (descriptionElement) descriptionElement.textContent = frontMatter.description || '';
        
        const heroImageElement = document.querySelector('.hero-image');
        if (heroImageElement && frontMatter.heroImage) {
            heroImageElement.style.backgroundImage = `url(${frontMatter.heroImage})`;
        } else if (heroImageElement) {
            heroImageElement.style.display = 'none'; // Hide if no hero image
        }
        
        const contentHtml = convertMarkdownToHtml(frontMatter.content || '');
        contentElement.innerHTML = contentHtml;

        // Highlight syntax using Prism.js
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }

        // If Markdown content can include data-lucide attributes
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
    } catch (error) {
        console.error('Error loading post:', error);
        contentElement.innerHTML = `<p>Sorry, there was an error loading this post. Please try again later. (${error.message})</p>`;
    } finally {
        if (spinner) spinner.style.display = 'none';
        postContainer.style.visibility = 'visible';
    }
}

function parseFrontMatter(markdown) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    
    if (!match) return { content: markdown }; // Return content as is if no front matter
    
    const frontMatter = {};
    const metadata = match[1];
    const content = match[2];
    
    metadata.split('\n').forEach(line => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
            frontMatter[key.trim()] = values.join(':').trim();
        }
    });
    
    frontMatter.content = content;
    return frontMatter;
}

function convertMarkdownToHtml(markdown) {
    if (typeof marked === 'undefined') {
        console.error('Marked.js library is not loaded.');
        return '<p>Error: Markdown parser not loaded.</p>';
    }
    return marked.parse(markdown);
}

document.addEventListener('DOMContentLoaded', renderPost);