import { CohereClient } from 'cohere-ai';

export const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY as string
});

export async function getEmbeddings(text: string) {
  const respone = await cohere.embed({ texts: [text] });

  const embeddings = respone.embeddings;

  return embeddings[0];
}
