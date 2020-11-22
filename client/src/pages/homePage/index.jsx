import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Header } from '../../components/header';
import { ImageTile } from '../../components/imageTile';
import { SearchBox } from '../../components/searchBox';
import { ShowMoreButton } from '../../components/showMoreButton';
import { PageContainer } from '../PageContainer';

const HomeContainer = styled('div')(() => ({
  padding: '32px',
  width: '100%',
  textAlign: 'center',
}));

const HomePage = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages('WWW');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchImages = async (query, pageNumber = 1, appendResult = false, scrollPosition = 0) => {
    if (query && pageNumber && query.trim().length > 0) {
      setCurrentQuery(query);
      setCurrentPageNumber(pageNumber);
      const result = await axios(`http://localhost:8080/image?query=${query}&pageNumber=${pageNumber}`);
      setImages(result.data.data);
      if (appendResult) {
        setImages(images.concat(result.data.data));
        window.scrollTo(0, scrollPosition);
      } else {
        setImages(result.data.data);
      }
    }
  }

  const showMore = async () => {
    fetchImages(currentQuery, currentPageNumber + 1, true, window.pageYOffset);
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12}>
          <Header title="Images Factory"/>
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
          <ShowMoreButton showMore={showMore} />
        </HomeContainer>
      </Grid>
    </PageContainer>
  );
};

export default HomePage;
