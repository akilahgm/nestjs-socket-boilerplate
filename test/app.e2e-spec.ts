import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const response = request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(response).toMatchObject({ status: 'UP', version: '1.2.0' });
  });

  it('/ (GET)', () => {
    const response = request(app.getHttpServer())
      .get('/info')
      .expect(200);

    expect(response).toMatchObject({
      name: 'driver-api',
      description: 'This is nodeJs BE service for driver app booking',
      version: '1.0.0',
    });
  });
});
