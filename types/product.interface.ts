export interface IProduct {
  id: string;
  artName: string;
  price: number;
  description: string;
  glassSurface: boolean;
  image: string;
  brand: string;
  limitedTimeDeal: number;
  feedbacks: IFeedback[];
}

export interface IFeedback {
  username: string;
  rating: number;
  feedback: string;
}

