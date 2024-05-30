import React from 'react';
import Room from '../components/Room';

const DetailsPage = ({ location }) => {
  const { state } = location;
  const { image } = state;

  return (
    <Room>
      <h1 className="Text-headline">Image Details</h1>
      <img src={image.urls.regular} alt={image.description} />
      <div className="Text-Normal">{image.description}</div>
    </Room>
  );
};

export default DetailsPage;
