import { getEmbeddings } from '@/lib/cohere';
import { db } from '@/lib/db';
import { insightsIndex } from '@/lib/pinecone';
import { getTextFromUrl } from '@/lib/utils';

import { cookies } from 'next/headers';

import { StreamingTextResponse, CohereStream } from 'ai';

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages;

  const messagesTruncated = messages.slice(-1);
  console.log(messagesTruncated);

  const embedding = await getEmbeddings(
    messagesTruncated
      .map((message: { role: string; content: string }) => message.content)
      .join('\n')
  );

  const vectorQueryRes = await insightsIndex.query({
    vector: embedding,
    topK: 1,
    filter: { classId: cookies().get('current-class')?.value }
  });

  const relevantResource = await db.resources.findFirst({
    where: {
      id: {
        in: vectorQueryRes.matches.map((match) => match.id)
      }
    }
  });

  const text = await getTextFromUrl(relevantResource?.resourceUrl as string);

  const prompt = `You are a smart AI educator that answers a doubt from the context that is given to you. Do not reference the resource or context anywhere. Also do not answer in more than 2 sentences. Do not use words such as "based". Just give a simple answer.\n
    The doubt is ${messagesTruncated}. \n
    The context for this doubt is: ${text}\n`;

  const reqBody = JSON.stringify({
    prompt,
    model: 'command-nightly',
    stop_sequences: [],
    temperature: 0,
    return_likelihoods: 'NONE',
    stream: true
  });

  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`
    },
    body: reqBody
  });

  const stream = CohereStream(response);

  return new StreamingTextResponse(stream);
}
