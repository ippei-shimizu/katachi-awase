export type LessonSkill = {
  id: number;
  name: string;
  slug: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type LessonSkillCreate = {
  name: string;
  slug: string;
  position: number;
};

export type LessonSkillUpdate = {
  id: number;
  name: string;
  slug: string;
  position: number;
};
