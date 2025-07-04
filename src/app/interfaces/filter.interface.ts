export type BookQuery = {
  genre?: string;
  $or?: {
    title?: { $regex: string; $options: string };
    author?: { $regex: string; $options: string };
    genre?: { $regex: string; $options: string };
  }[];
  $and?: {
    $or: {
      title?: { $regex: string; $options: string };
      author?: { $regex: string; $options: string };
      genre?: { $regex: string; $options: string };
    }[];
  }[];
};
