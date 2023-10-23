import type { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhoto } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string,
): Promise<ImagesResults | undefined> {
  try {
    const response = await fetch(url, {
      headers: { Authorization: env.PEXELS_API_KEY },
    });

    if (!response.ok) {
      throw new Error("Fetch Images error !\n");
    }

    const imagesResults: ImagesResults = await response.json();
    console.log("imagesResults = ", imagesResults);

    // parse data using the created Zod schema
    const parsedData = ImagesSchemaWithPhoto.parse(imagesResults);

    // check
    if (parsedData.total_results === 0) {
      return undefined;
    }

    return parsedData;
  } catch (error) {
    // will show terminal
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}
