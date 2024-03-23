import axios from "axios";

export interface OEmbedResponse {
  thumbnail_height: number;
  version: string;
  url: string;
  height: number;
  provider_url: string;
  type: string;
  html: string;
  thumbnail_url: string;
  author_name: string;
  author_url: string;
  title: string;
  width: number;
  thumbnail_width: number;
  provider_name: string;
}

export interface VideoMetadata {
  authorName: string;
  authorUrl: string;
  thumbnailUrl: string;
  title: string;
}

export interface OmbedError {
  error: string;
}

const isError = (data: OEmbedResponse | OmbedError): data is OmbedError => {
  return Object.keys(data).includes("error");
};

export const ombedVideo = async (videoUrl: string): Promise<VideoMetadata> => {
  const response = await axios.get<OEmbedResponse | OmbedError>(`https://noembed.com/embed?url=${videoUrl}`);
  const ombedData = response.data;

  if (isError(ombedData)) {
    throw new URIError("Invalid video link");
  }

  return fromOmbedToVideoData(ombedData);
};

const fromOmbedToVideoData = (ombedData: OEmbedResponse): VideoMetadata => {
  return {
    authorName: ombedData.author_name,
    authorUrl: ombedData.author_url,
    thumbnailUrl: ombedData.thumbnail_url,
    title: ombedData.title,
  };
};
