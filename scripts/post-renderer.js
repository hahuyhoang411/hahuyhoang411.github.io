document.addEventListener('DOMContentLoaded', async function() {
    // Get the markdown file path from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postPath = urlParams.get('post');
    
    if (!postPath) {
        console.error('No post specified');
        return;
    }

    try {
        // Add /posts/ directory to the path if not present
        const fullPath = postPath.startsWith('/posts/') ? postPath : `/posts/${postPath}`;
        
        // Fetch the markdown content
        const response = await fetch(`${fullPath}.md`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdown = await response.text();

        // Parse frontmatter and get clean content
        const { metadata, content } = parseMetadata(markdown);
        
        // Set hero image with correct path
        if (metadata.heroImage) {
            const heroPath = metadata.heroImage.startsWith('/') ? metadata.heroImage : `/${metadata.heroImage}`;
            document.querySelector('.hero-image').style.backgroundImage = `url(${heroPath})`;
        }

        // Set metadata
        if (metadata.date) {
            document.querySelector('.post-date').textContent = metadata.date;
        }
        if (metadata.title) {
            document.querySelector('.post-title').textContent = metadata.title;
            document.title = `${metadata.title} - Study AI with me`;
        }
        if (metadata.description) {
            document.querySelector('.post-description').textContent = metadata.description;
        }

        // Configure marked for code highlighting
        marked.setOptions({
            highlight: function(code, lang) {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            }
        });

        // Render markdown content
        const renderedContent = marked.parse(content);
        document.querySelector('.post-content').innerHTML = renderedContent;

    } catch (error) {
        console.error('Error loading post:', error);
        document.querySelector('.post-content').innerHTML = `
            <div class="error-message">
                <h2>Error Loading Post</h2>
                <p>Sorry, we couldn't load the post. Please try again later.</p>
            </div>
        `;
    }
});

function parseMetadata(markdown) {
    const metadata = {};
    const lines = markdown.split('\n');
    let inMetadata = false;
    let contentStartIndex = 0;
    
    // Find the metadata section
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '---') {
            if (!inMetadata) {
                inMetadata = true;
                contentStartIndex = i;
            } else {
                contentStartIndex = i + 1;
                break;
            }
            continue;
        }
        
        if (inMetadata) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            if (key && value) {
                metadata[key.trim()] = value;
            }
        }
    }
    
    // Get content without frontmatter
    const content = lines.slice(contentStartIndex + 1).join('\n').trim();
    
    return { metadata, content };
}