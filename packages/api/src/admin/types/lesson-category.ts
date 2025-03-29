export type LessonCategory = {
  id: number;
  name: string;
  slug: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type LessonCategoryCreate = {
  name: string;
  slug: string;
  position: number;
};

export type LessonCategoryUpdate = {
  id: number;
  name: string;
  slug: string;
  position: number;
};
