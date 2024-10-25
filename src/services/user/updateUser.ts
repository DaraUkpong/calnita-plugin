interface UpdateUserParams {
  formData: any;
  userId: string;
}

export const updateUser = async ({ formData, userId }: UpdateUserParams) => {
  //console.log("Form data being sent to API:", formData);
  //return;
  const response = await fetch("/api/update-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, userId }),
  });
  return response;
};
