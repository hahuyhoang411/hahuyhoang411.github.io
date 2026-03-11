import { Helmet } from "react-helmet-async";

const SITE_URL = "https://hahuyhoang411.github.io";
const DEFAULT_IMAGE = `${SITE_URL}/thumbnail.png`;
const SITE_NAME = "Hoang's Space";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  publishedDate?: string;
}

const SEO = ({
  title,
  description = "Personal portfolio and blog of Huy Hoang Ha — AI researcher, pharmacist, and open-source contributor.",
  image = DEFAULT_IMAGE,
  path = "/",
  type = "website",
  publishedDate,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@HaHoang411" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
    </Helmet>
  );
};

export default SEO;
