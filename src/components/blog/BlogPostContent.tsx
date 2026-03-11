
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import YouTubeEmbed from './YouTubeEmbed';

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] || []), 'className', 'class', 'style'],
    'img': [...(defaultSchema.attributes?.img || []), 'src', 'alt', 'title', 'loading', 'width', 'height'],
    'a': [...(defaultSchema.attributes?.a || []), 'href', 'title', 'target', 'rel'],
    'iframe': ['src', 'width', 'height', 'frameBorder', 'allow', 'allowFullScreen', 'title', 'className'],
  },
  tagNames: [...(defaultSchema.tagNames || []), 'iframe', 'figure', 'figcaption'],
};

interface BlogPostContentProps {
  content: string;
}

// Helper function to render content with YouTube embeds
const renderContentWithEmbeds = (content: string) => {
  const parts = content.split(/(<YouTubeEmbed[^>]*\/>)/g);
  
  return parts.map((part, index) => {
    // Check if this part is a YouTube embed
    if (part.startsWith('<YouTubeEmbed')) {
      // Extract props from the embed tag
      const videoIdMatch = part.match(/videoId="([^"]+)"/);
      const titleMatch = part.match(/title="([^"]+)"/);
      const captionMatch = part.match(/caption="([^"]+)"/);
      
      if (videoIdMatch) {
        return (
          <YouTubeEmbed
            key={index}
            videoId={videoIdMatch[1]}
            title={titleMatch ? titleMatch[1] : undefined}
            caption={captionMatch ? captionMatch[1] : undefined}
          />
        );
      }
    }
    
    // Regular markdown content
    return (
      <ReactMarkdown 
        key={index}
        remarkPlugins={[remarkGfm, remarkToc]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, sanitizeSchema],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ]}
        components={{
          h1: ({children}) => <h1 className="text-3xl font-bold text-foreground mt-8 mb-6 first:mt-0">{children}</h1>,
          h2: ({children, ...props}) => <h2 className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-20" {...props}>{children}</h2>,
          h3: ({children, ...props}) => <h3 className="text-xl font-bold text-foreground mt-8 mb-3 scroll-mt-20" {...props}>{children}</h3>,
          p: ({children}) => <p className="text-foreground/80 leading-relaxed mb-6">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-inside mb-6 text-foreground/80 flex flex-col gap-2">{children}</ul>,
          li: ({children}) => <li className="leading-relaxed">{children}</li>,
          code: ({children}) => <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground/90">{children}</code>,
          pre: ({children}) => <pre className="bg-code-block text-code-block-foreground p-6 rounded-lg overflow-x-auto mb-6 text-sm font-mono">{children}</pre>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground mb-6 bg-muted py-4 rounded-r-lg">{children}</blockquote>,
          strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
        }}
      >
        {part}
      </ReactMarkdown>
    );
  });
};

const BlogPostContent = ({ content }: BlogPostContentProps) => (
  <article className="prose prose-lg max-w-none">
    {renderContentWithEmbeds(content)}
  </article>
);

export default BlogPostContent;
