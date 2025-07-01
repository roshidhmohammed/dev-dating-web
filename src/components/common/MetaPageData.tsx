import { Helmet } from "react-helmet";

const MetaPageData = ({
  title,
  description,
  keywords = "",
  image = "",
  url = "http://localhost:5173/",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default MetaPageData;
