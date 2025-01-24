document.addEventListener('DOMContentLoaded', async function() {
    // Get the markdown file path from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postPath = urlParams.get('post');
    
    if (!postPath) {
        console.error('No post specified');
        return;
    }

    try {
        // Fetch the markdown content
        const response = await fetch(`${postPath}.md`);
        const markdown = await response.text();

        // Parse frontmatter and get clean content
        const { metadata, content } = parseMetadata(markdown);
        
        // Set hero image
        if (metadata.heroImage) {
            document.querySelector('.hero-image').style.backgroundImage = `url(${metadata.heroImage})`;
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

        // Render markdown content (without frontmatter)
        const renderedContent = marked.parse(content);
        document.querySelector('.post-content').innerHTML = renderedContent;

    } catch (error) {
        console.error('Error loading post:', error);
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