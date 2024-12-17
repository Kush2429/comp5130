export function createFormData(data: Record<string, any>) {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }

  return formData;
}
