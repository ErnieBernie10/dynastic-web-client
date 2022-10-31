type FormDataEntryValue = string | File;

export const extractFormValues = <T extends Record<string, unknown>>(
  formData: FormData,
  fields: Record<keyof T, string>
): Record<keyof T, FormDataEntryValue> =>
  Object.keys(fields).reduce((prev, curr) => {
    const formValue = formData.get(curr);
    return {
      ...prev,
      [curr]: formValue,
    };
  }, {} as Record<keyof T, FormDataEntryValue>);
