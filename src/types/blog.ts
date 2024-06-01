export type Blog = {
  id: string;
  title: string;
  picture: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  instructorId: string;
  blogCategoryId: string;
  peopleLikeIds: string[];
  peopleUnlikeIds: string[];
};
