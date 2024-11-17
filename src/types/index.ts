/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";
import * as schema from "@/src/server/schema"
import { int } from "drizzle-orm/mysql-core";

export type User = typeof schema.Users.$inferInsert;
export type Users = typeof schema.Users.$inferSelect;
export type Item = typeof schema.Item.$inferInsert;
export type Items = typeof schema.Item.$inferSelect;

export type CartItem = typeof schema.CartItem.$inferInsert;
export type CartItems = typeof schema.CartItem.$inferSelect;

export type Order = typeof schema.Order.$inferInsert;
export type Orders = typeof schema.Order.$inferSelect;

export interface OrderProps {
  order: Order;
  cartItems: CartItems[];
}
export type Module ={
   module: string; annee: string;departement: string;
}
export type Upload = typeof schema.Uploads.$inferInsert;

export type Wilaya = {
  id: string;
  code: string;
  name: string;
  ar_name: string;
  longitude: string;
  latitude: string;
};

export type Commune = {
  id: string;
  post_code: string;
  name: string;
  wilaya_id: string;
  ar_name: string;
  longitude: string;
  latitude: string;
};


export type MergedItemCart = {
  id: number;
  Titre: string;
  Category: string;
  Annee: string;
  Module: string;
  Type: string;
  PdfUrl: string;
  imageURL: string;
  Prix: number | null;
  Quantite: number;
  CartPrix: number;
};

export interface SoundModel {
  name: string; // The name of the sound model
  url: string;  // The URL to the model for generating sound
}
export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface TopPodcastersProps {
  _id: number;
  _creationTime: number;
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
  podcast: {
    podcastTitle: string;
    pocastId: number;
  }[];
  totalPodcasts: number;
}

export interface PodcastProps {
  _id:number;
  _creationTime: number;
  audioStorageId: string | null;
  user: number;
  podcastTitle: string;
  podcastDescription: string;
  audioUrl: string | null;
  imageUrl: string | null;
  imageStorageId: string | null;
  author: string;
  authorId: string;
  authorImageUrl: string;
  voicePrompt: string;
  imagePrompt: string | null;
  voiceType: string;
  audioDuration: number;
  views: number;
}

export interface ProfilePodcastProps {
  podcasts: PodcastProps[];
  listeners: number;
}
export type Uploadable = "audio" | "image";
export type VoiceType =
  | "alloy"
  | "echo"
  | "fable"
  | "onyx"
  | "nova"
  | "shimmer"|null;
export type UploadType = "podcast"|"thumbnail";
export interface GeneratePodcastProps {
  voiceType: "alloy"
  | "echo"
  | "fable"
  | "onyx"
  | "nova"
  | "shimmer" |null;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<string | null>>;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<string | null>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

export interface LatestPodcastCardProps {
  imgUrl: string;
  title: string;
  duration: string;
  index: number;
  audioUrl: string;
  author: string;
  views: number;
  podcastId: number;
}

export interface CoursDetailPlayerProps {
  pdfurl: string;
  podcastTitle: string;
  author: string;
  isOwner: boolean;
  imageUrl: string;
  podcastId: number;
  imageStorageId: string;
  audioStorageId: string;
  authorImageUrl: string;
  authorId: string;
}

export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  podcastId: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface PodcastCardProps {
  imgUrl: string;
  title: string;
  description: string;
  podcastId: number;
}

export interface CarouselProps {
  fansLikeDetail: TopPodcastersProps[];
}

export interface ProfileCardProps {
  podcastData: ProfilePodcastProps;
  imageUrl: string;
  userFirstName: string;
}

export type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};
