export type Post = {
  id: string;
  nickname: string;
  title: string;
  content: string;
  likes: number;
  views: number;
  location: string[];
  startedAt: string;
  endAt: string;
  hashtag: string[];
  hidden: boolean;
  createdAt: string;
  tripLikes: string[];
  images: string[];
  isLiked: boolean;
  public: boolean;
};

export type CreatePost = {
  title: string;
  content: string;
  location: string;
  startedAt: string;
  endAt: string;
  latitude: number;
  longitude: number;
  hashtagInfo: {
    countryCode: string;
    country: string;
    city: string;
    municipality: string;
    name: string;
    displayName: string;
    road: string;
    address: string;
    etc: string[];
  };
  isPublic: boolean;
  images: [];
};
