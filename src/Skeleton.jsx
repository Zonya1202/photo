import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={350}
    height={460}
    viewBox="0 0 350 460"
    backgroundColor="#ebebeb"
    foregroundColor="#fcfcfc"
    {...props}>
    <rect x="0" y="0" rx="30" ry="30" width="347" height="450" />
  </ContentLoader>
);

export default Skeleton;
