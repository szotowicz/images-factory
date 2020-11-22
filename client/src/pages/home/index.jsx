import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { Header } from '../../components/header';
import { ImageTile } from '../../components/imageTile';
import { PageContainer } from '../PageContainer';
import { HomeContainer } from './HomeContainer';

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const result = await axios('http://localhost:8080/image?query=dog');
      setImages(result.data.data);
    }

    fetchImages();
  }, []);

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12}>
          <Header title="Images Factory" />
        </Grid>
        <HomeContainer>
          <Grid container spacing={3} alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            {images && images.map((image, id) => {
              return (
                <ImageTile id={image.id} pageURL={image.pageURL} img={image.mediumImageURL} key={id}/>
              )
            })}
          </Grid>
        </HomeContainer>
      </Grid>
    </PageContainer>
  );
};

export default HomePage;
