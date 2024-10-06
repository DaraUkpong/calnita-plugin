interface UpdateUserParams {
  formData: any;
  userId: string;
}

export const updateUser = async ({ formData, userId }: UpdateUserParams) => {
  try {
    const response = await fetch("/api/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, userId }),
    });
    return response;
  } catch (error) {
    console.error("Failed to update user data:", error);
    return null;
  }
};
