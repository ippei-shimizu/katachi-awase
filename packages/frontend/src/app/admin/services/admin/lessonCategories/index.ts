import { apiClient } from "@/lib/client";

export const getAdminLessonCategories = async () => {
  const response = await apiClient.api.admin["admin-lesson-categories"].$get({
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
