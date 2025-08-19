// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch('https://raw.githubusercontent.com/kubra-kzlk/test_dinomon/heads/main/data.json');
    const jsonData = await response.json();

    const dinomons = jsonData.dinomons;
    
    //Transform dinomons by adding full region object
    const enrichedDinomons = dinomons.map((dinomon: any) => {
      return {
        ...dinomon,
      };
    });
  res.status(200).json({ enrichedDinomons });
}
