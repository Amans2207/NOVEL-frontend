import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, schema, keywords, ogImage, url }) => {
  const siteUrl = "https://novelenterprises.in"; // Fallback URL
  const currentUrl = url ? `${siteUrl}${url}` : siteUrl;
  const image = ogImage || "https://novelenterprises.in/og-image.jpg"; // Default generic OG Image

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title} | Novel Enterprises - Premium Industrial Solutions</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || "Industrial Equipment, Forklifts, Pallet Trucks, Warehouse Automation, AMC Services, Scissor Lifts, EOT Cranes"} />
      <meta name="author" content="Novel Enterprises" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={`${title} | Novel Enterprises`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Novel Enterprises" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={`${title} | Novel Enterprises`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* AEO / GEO Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
