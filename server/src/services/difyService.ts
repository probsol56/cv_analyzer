import axios from 'axios';
import FormData from 'form-data';
import { config } from '../config';

const makeDifyClient = (apiKey: string) =>
  axios.create({
    baseURL: config.DIFY_API_URL,
    headers: { Authorization: `Bearer ${apiKey}` },
  });

const cvClient = makeDifyClient(config.DIFY_CV_KEY);
const hrClient = makeDifyClient(config.DIFY_HR_KEY);
const linkedinClient = makeDifyClient(config.DIFY_LINKEDIN_KEY);

export const difyService = {
  async uploadCvFile(fileBuffer: Buffer, filename: string, mimetype: string) {
    const form = new FormData();
    form.append('file', fileBuffer, { filename, contentType: mimetype });
    form.append('user', 'server');
    const { data } = await cvClient.post('/files/upload', form, {
      headers: form.getHeaders(),
    });
    return data;
  },

  async uploadHrFile(fileBuffer: Buffer, filename: string, mimetype: string) {
    const form = new FormData();
    form.append('file', fileBuffer, { filename, contentType: mimetype });
    form.append('user', 'server');
    const { data } = await hrClient.post('/files/upload', form, {
      headers: form.getHeaders(),
    });
    return data;
  },

  async analyzeCV(inputs: object, userId: string) {
    const { data } = await cvClient.post('/workflows/run', {
      inputs,
      response_mode: 'blocking',
      user: userId,
    });
    return data;
  },

  async runHrScan(inputs: object, userId: string) {
    const { data } = await hrClient.post('/workflows/run', {
      inputs,
      response_mode: 'blocking',
      user: userId,
    });
    return data;
  },

  async runLinkedinOptimize(inputs: object, userId: string) {
    const { data } = await linkedinClient.post('/workflows/run', {
      inputs,
      response_mode: 'blocking',
      user: userId,
    });
    return data;
  },
};
