import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  environment: 'gcp-starter',
  apiKey: process.env.PINECONE_API_KEY as string
});

export const insightsIndex = pinecone.Index('insights');
