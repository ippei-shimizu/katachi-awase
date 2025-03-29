import { apiClient } from "@/lib/client";
import { LessonSkillCreate, LessonSkillUpdate } from "@api/admin/types/lesson-skill";

export const getLessonSkills = async () => {
  const response = await apiClient.api.admin["admin-lesson-skills"].$get({
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getLessonSkill = async (id: number) => {
  const response = await apiClient.api.admin["admin-lesson-skills"][":id"].$get({
    param: { id: String(id) },
  });
  return await response.json();
};

export const createLessonSkill = async (data: LessonSkillCreate) => {
  const response = await apiClient.api.admin["admin-lesson-skills"].$post({
    json: data,
  });
  return await response.json();
};

export const updateLessonSkill = async (id: number, data: LessonSkillUpdate) => {
  const response = await apiClient.api.admin["admin-lesson-skills"][":id"].$put({
    param: { id: String(id) },
    json: data,
  });
  return await response.json();
};

export const deleteLessonSkill = async (id: number) => {
  const response = await apiClient.api.admin["admin-lesson-skills"][":id"].$delete({
    param: { id: String(id) },
  });
  return await response.json();
};
