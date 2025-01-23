# Study AI with me - Personal Blog

A minimalist blog focused on AI studies and experiences.

## Project Structure

├── index.html # Main entry point
├── css/ # Styling files
│ └── style.css # Main stylesheet
├── assets/ # Static assets directory
│ ├── images/ # Blog post images
│ ├── fonts/ # Custom fonts
│ └── icons/ # Icons and favicons
├── posts/ # Blog post HTML files
│ └── YYYY-MM-DD-title.html
├── scripts/ # JavaScript files
│ └── main.js # Main JavaScript file
└── README.md # Project documentation


## Features

- Minimalist design
- Responsive layout
- Image optimization
- Social media integration
- Category-based organization

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/hahuyhoang411/hahuyhoang411.github.io.git
    ```

2. Create new blog posts:
   - Add images to `/assets/images/`
   - Create new post file in `/posts/` following the format: `YYYY-MM-DD-title.html`
   - Link images using relative paths: `../assets/images/your-image.jpg`

3. Deploy:
   - Push changes to main branch
   - GitHub Pages will automatically deploy your site

## Image Guidelines

- Recommended image formats: JPG, PNG, WebP
- Maximum image width: 1200px
- Optimize images before uploading
- Use descriptive file names
- Store in appropriate subdirectories under `/assets/images/`

## Writing Posts

1. Create a new HTML file in `/posts/` directory
2. Use the following template:

```html
    html
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Title - Study AI with me</title>
    <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
    <!-- Post content here -->
    </body>
    </html>
```

## Development

- Use relative paths for all assets
- Test locally before pushing changes
- Follow the established directory structure
- Optimize images using tools like ImageOptim or TinyPNG

## License

MIT License - feel free to use this template for your own blog
