
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import YouTubeEmbed from './YouTubeEmbed';

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
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ]}
        components={{
          h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-6 first:mt-0">{children}</h1>,
          h2: ({children, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-20" {...props}>{children}</h2>,
          h3: ({children, ...props}) => <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-20" {...props}>{children}</h3>,
          p: ({children}) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">{children}</ul>,
          li: ({children}) => <li className="leading-relaxed">{children}</li>,
          code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>,
          pre: ({children}) => <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6 text-sm">{children}</pre>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 mb-6 bg-blue-50 py-4">{children}</blockquote>,
          strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
        }}
      >
        {part}
      </ReactMarkdown>
    );
  });
};

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  return (
    <>
      <style>{`
        .prose .image-container { margin: 2em 0; text-align: center; }
        .prose .image-container img { max-width: 100%; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 0.5em; }
        .prose .image-caption { font-size: 0.875em; color: #6b7280; font-style: italic; }
        .prose .video-container { margin: 2em 0; text-align: center; }
        .prose .video-container video { max-width: 100%; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .prose .video-caption { font-size: 0.875em; color: #6b7280; font-style: italic; margin-top: 0.5em; }
      `}</style>
      <article className="prose prose-lg max-w-none">
        {renderContentWithEmbeds(content)}
      </article>
    </>
  );
};

export default BlogPostContent;
