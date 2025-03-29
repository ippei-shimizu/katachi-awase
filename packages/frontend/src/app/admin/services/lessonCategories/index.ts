import { apiClient } from "@/lib/client";
import { LessonCategoryCreate, LessonCategoryUpdate } from "@api/admin/types/lesson-category";

export const getLessonCategories = async () => {
  const response = await apiClient.api.admin["admin-lesson-categories"].$get({
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getLessonCategory = async (id: number) => {
  const response = await apiClient.api.admin["admin-lesson-categories"][":id"].$get({
    param: { id: String(id) },
  });
  return await response.json();
};

export const createLessonCategory = async (data: LessonCategoryCreate) => {
  const response = await apiClient.api.admin["admin-lesson-categories"].$post({
    json: data,
  });
  return await response.json();
};

export const updateLessonCategory = async (id: number, data: LessonCategoryUpdate) => {
  const response = await apiClient.api.admin["admin-lesson-categories"][":id"].$put({
    param: { id: String(id) },
    json: data,
  });
  return await response.json();
};

export const deleteLessonCategory = async (id: number) => {
  const response = await apiClient.api.admin["admin-lesson-categories"][":id"].$delete({
    param: { id: String(id) },
  });
  return await response.json();
};
