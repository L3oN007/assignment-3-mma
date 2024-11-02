import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { IFeedback } from "@/types/product.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateAverageRating = (feedbacks: IFeedback[]): number => {
  if (feedbacks.length === 0) return 0;
  const totalRating = feedbacks.reduce(
    (acc, feedback) => acc + feedback.rating,
    0
  );
  return totalRating / feedbacks.length;
};
