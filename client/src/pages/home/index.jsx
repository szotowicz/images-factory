import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Header } from '../../components/header';
import { ImageTile } from '../../components/imageTile';
import { PageContainer } from '../PageContainer';
import { HomeContainer } from './HomeContainer';

const MOCK = {
  pageNumber: 3,
  pageCount: 20,
  data: [
  {
  id: "1861839",
  type: "photo",
  pageURL: "https://pixabay.com/photos/dog-friendship-nature-trust-1861839/",
  smallImageURL: "https://cdn.pixabay.com/photo/2016/11/26/23/45/dog-1861839_150.jpg",
  mediumImageURL: "https://pixabay.com/get/57e8d3424251a514f1dc846096293e7f1c3bdbe0574c704f752a72dd934ccc5e_640.jpg",
  largeImageURL: "https://pixabay.com/get/57e8d3424251a514f6da8c7dda7936771436dae056556c48732f7edd9e49c451be_1280.jpg"
  },
  {
  id: "1210025",
  type: "photo",
  pageURL: "https://pixabay.com/photos/pug-dog-blanket-bed-face-animal-1210025/",
  smallImageURL: "https://cdn.pixabay.com/photo/2016/02/19/11/53/pug-1210025_150.jpg",
  mediumImageURL: "https://pixabay.com/get/57e2d4434a50a914f1dc846096293e7f1c3bdbe0574c704f752a72dd934ccc5e_640.jpg",
  largeImageURL: "https://pixabay.com/get/57e2d4434a50a914f6da8c7dda7936771436dae056556c48732f7edd9e49c451be_1280.jpg"
  },
  {
  id: "iOm9Vq70jDoZy",
  type: "gif",
  pageURL: "https://giphy.com/gifs/pug-made-with-tumblr-iOm9Vq70jDoZy",
  smallImageURL: "https://media4.giphy.com/media/iOm9Vq70jDoZy/giphy-downsized-small.mp4?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy-downsized-small.mp4",
  mediumImageURL: "https://media4.giphy.com/media/iOm9Vq70jDoZy/giphy.gif?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy.gif",
  largeImageURL: "https://media4.giphy.com/media/iOm9Vq70jDoZy/giphy.gif?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy.gif"
  },
  {
  id: "1168663",
  type: "photo",
  pageURL: "https://pixabay.com/photos/dog-snow-st-bernard-dog-winter-pet-1168663/",
  smallImageURL: "https://cdn.pixabay.com/photo/2016/01/29/20/54/dog-1168663_150.jpg",
  mediumImageURL: "https://pixabay.com/get/57e1d34b4c54af14f1dc846096293e7f1c3bdbe0574c704f752a72dd934ccc5e_640.jpg",
  largeImageURL: "https://pixabay.com/get/57e1d34b4c54af14f6da8c7dda7936771436dae056556c48732f7edd9e49c451be_1280.jpg"
  },
  {
  id: "1785760",
  type: "photo",
  pageURL: "https://pixabay.com/photos/rottweiler-puppy-dog-dogs-cute-1785760/",
  smallImageURL: "https://cdn.pixabay.com/photo/2016/10/31/14/55/rottweiler-1785760_150.jpg",
  mediumImageURL: "https://pixabay.com/get/57e7dd464d54ac14f1dc846096293e7f1c3bdbe0574c704f752a72dd934ccc5e_640.jpg",
  largeImageURL: "https://pixabay.com/get/57e7dd464d54ac14f6da8c7dda7936771436dae056556c48732f7edd9e49c451be_1280.jpg"
  },
  {
  id: "L0NBGdEtE8tUP6MVwH",
  type: "gif",
  pageURL: "https://giphy.com/gifs/friends-forest-enjoying-L0NBGdEtE8tUP6MVwH",
  smallImageURL: "https://media3.giphy.com/media/L0NBGdEtE8tUP6MVwH/giphy-downsized-small.mp4?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy-downsized-small.mp4",
  mediumImageURL: "https://media3.giphy.com/media/L0NBGdEtE8tUP6MVwH/giphy-downsized-medium.gif?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy-downsized-medium.gif",
  largeImageURL: "https://media3.giphy.com/media/L0NBGdEtE8tUP6MVwH/giphy-downsized-large.gif?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy-downsized-large.gif"
  },
  {
  id: "3ohzdYGKrPn8GzgAes",
  type: "gif",
  pageURL: "https://giphy.com/gifs/reactionseditor-3ohzdYGKrPn8GzgAes",
  smallImageURL: "https://media1.giphy.com/media/3ohzdYGKrPn8GzgAes/giphy-downsized-small.mp4?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy-downsized-small.mp4",
  mediumImageURL: "https://media1.giphy.com/media/3ohzdYGKrPn8GzgAes/giphy.gif?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy.gif",
  largeImageURL: "https://media1.giphy.com/media/3ohzdYGKrPn8GzgAes/giphy.gif?cid=e6ef4cf80vtqoq2nd2rqxe9t0dmrwhjpk7k35vcogtwj8oxj&rid=giphy.gif"
  }
  ]
};

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // TODO : featch it
    setImages(MOCK.data);
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
