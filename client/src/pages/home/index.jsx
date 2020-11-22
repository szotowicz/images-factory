import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Header } from '../../components/header';
import { ImageTile } from '../../components/imageTile';
import { SearchBox } from '../../components/searchBox';
import { PageContainer } from '../PageContainer';

const HomeContainer = styled('div')(() => ({
  padding: '32px',
  width: '100%',
  textAlign: 'center',
}));

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages('WWW');
  }, []);

  const fetchImages = async (query) => {
    if (query && query.length > 0) {
      console.log('szuka mi ', query);
      const result = await axios(`http://localhost:8080/image?query=${query}`);
      setImages(result.data.data);
    }
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12}>
          <Header title="Images Factory" />
        </Grid>
        <HomeContainer>
          <SearchBox fetchImages={fetchImages} />
          <Grid container spacing={3} alignItems="center" justify="center">
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
