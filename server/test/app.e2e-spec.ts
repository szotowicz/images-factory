import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ImageModule } from './../src/image/image.module';
import { Image } from './../src/image/schema/image';
import { ImageSearchResult } from './../src/image/schema/image-search-result';

describe('ImageController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ImageModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return error 400 - no searched phrase', async () => {
    await request(app.getHttpServer()).get('/image').expect('Content-Type', /json/).expect(400);
  });

  it('should return empty data array - no result found', async () => {
    const response = await request(app.getHttpServer())
      .get('/image?query=123123421312asdasasdasd123414123')
      .expect('Content-Type', /json/)
      .expect(200);

    const result: ImageSearchResult = response.body;
    expect(result.pageNumber).toBe(1);
    expect(result.pageCount).toBe(20);
    expect(result.data.length).toBe(0);
  });

  it('should return founded images', async () => {
    const response = await request(app.getHttpServer())
      .get('/image?query=dog')
      .expect('Content-Type', /json/)
      .expect(200);

    const result: ImageSearchResult = response.body;
    expect(result.pageNumber).toBe(1);
    expect(result.pageCount).toBe(20);
    expect(result.data.length).toBe(20);
    result.data.forEach((i: Image) => {
      expect(i.id).toBeDefined();
      expect(i.type).toBeDefined();
      expect(i.pageURL).toBeDefined();
      expect(i.smallImageURL).toBeDefined();
      expect(i.mediumImageURL).toBeDefined();
      expect(i.largeImageURL).toBeDefined();
    });
  });

  it('first page should contain the same elements as default', async () => {
    const responseDefaultPageNumber = await request(app.getHttpServer())
      .get('/image?query=dog')
      .expect('Content-Type', /json/)
      .expect(200);

    const responseFirstPage = await request(app.getHttpServer())
      .get('/image?query=dog&pageNumber=1')
      .expect('Content-Type', /json/)
      .expect(200);

    const defaultPageResult: ImageSearchResult = responseDefaultPageNumber.body;
    const firstPageResult: ImageSearchResult = responseFirstPage.body;
    expect(defaultPageResult.pageNumber).toBe(firstPageResult.pageNumber);
    expect(defaultPageResult.pageCount).toBe(firstPageResult.pageCount);
    defaultPageResult.data.forEach((i: Image) => {
      const sameImageInFirstPageResult = firstPageResult.data.find((image) => image.id === i.id);
      expect(sameImageInFirstPageResult).not.toBe(null);
      expect(sameImageInFirstPageResult.type).toBe(i.type);
      expect(sameImageInFirstPageResult.pageURL).toBe(i.pageURL);
      // URLs from PixabayResult usually have a slightly different URL (hash value), but it is the same image
      expect(sameImageInFirstPageResult.smallImageURL).toBeDefined();
      expect(sameImageInFirstPageResult.mediumImageURL).toBeDefined();
      expect(sameImageInFirstPageResult.largeImageURL).toBeDefined();
    });
  });

  it('second page should contain elements other than first page', async () => {
    const responseFirstPage = await request(app.getHttpServer())
      .get('/image?query=dog&pageNumber=1')
      .expect('Content-Type', /json/)
      .expect(200);

    const responseSecondPage = await request(app.getHttpServer())
      .get('/image?query=dog&pageNumber=2')
      .expect('Content-Type', /json/)
      .expect(200);

    const firstPageResult: ImageSearchResult = responseFirstPage.body;
    const secondPageResult: ImageSearchResult = responseSecondPage.body;
    expect(firstPageResult.pageNumber).toBe(1);
    expect(secondPageResult.pageNumber).toBe(2);
    expect(firstPageResult.pageCount).toBe(secondPageResult.pageCount);
    firstPageResult.data.forEach((i: Image) => {
      const sameImageInSecondPageResult = secondPageResult.data.find((image) => image.id === i.id);
      expect(sameImageInSecondPageResult).toBe(undefined);
    });
  });
});
