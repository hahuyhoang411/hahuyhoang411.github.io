async function renderPost() {
    // Get the post name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postName = urlParams.get('post');
    
    if (!postName) return;

    try {
        // Fetch the markdown file
        const response = await fetch(`../posts/${postName}.md`);
        const markdownContent = await response.text();
        
        // Parse front matter (metadata between --- markers)
        const frontMatter = parseFrontMatter(markdownContent);
        
        // Update the page elements with the post data
        document.querySelector('.post-date').textContent = frontMatter.date;
        document.querySelector('.topic-tag').textContent = frontMatter.topic;
        document.querySelector('.topic-tag').href = `/topics/${frontMatter.topicSlug}`;
        document.querySelector('.post-title').textContent = frontMatter.title;
        document.querySelector('.post-description').textContent = frontMatter.description;
        
        // Set hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.backgroundImage = `url(${frontMatter.heroImage})`;
        }
        
        // Convert markdown content to HTML and insert it
        const contentHtml = convertMarkdownToHtml(frontMatter.content);
        document.querySelector('.post-content').innerHTML = contentHtml;
        
    } catch (error) {
        console.error('Error loading post:', error);
    }
}

function parseFrontMatter(markdown) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    
    if (!match) return null;
    
    const frontMatter = {};
    const metadata = match[1];
    const content = match[2];
    
    // Parse metadata
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
    return marked.parse(markdown);
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', renderPost);