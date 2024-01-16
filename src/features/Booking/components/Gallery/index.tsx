import { ImageList, ImageListItem } from '@mui/material';
import { properties } from '../../../../mock/properties';

export const Gallery = () => {
  const { images } = properties;
  return (
    <>
      <ImageListItem key={images[0]}>
        <img
          srcSet={`${images[0]}?w=1280&h=720&fit=crop&auto=format&dpr=2 2x`}
          src={`${images[0]}?w=640&h=360&fit=crop&auto=format`}
          loading="lazy"
          style={{ width: '100%', borderRadius: 4 }}
        />
      </ImageListItem>
      <ImageList sx={{ width: '100%' }} cols={3} gap={4}>
        {images.slice(1).map((image, index) => (
          <ImageListItem key={image}>
            <img
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              alt={`Image ${index + 2}`}
              loading="lazy"
              style={{ borderRadius: 4 }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
