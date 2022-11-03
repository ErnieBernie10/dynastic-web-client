import { baseUrl, fetcher } from "~/data-access/client";

export const createDynasty = fetcher
  .path("/api/Dynasty")
  .method("post")
  .create();

export const updateDynasty = fetcher
  .path("/api/Dynasty/{id}")
  .method("put")
  .create();

export const addMember = fetcher
  .path("/api/Dynasty/{dynastyId}/Person")
  .method("post")
  .create();

export const updateMember = fetcher
  .path("/api/Dynasty/{dynastyId}/Person/{id}")
  .method("put")
  .create();

// TODO: Figure out why this isn't working and revert the work around
// fetcher
//   .path("/api/Dynasty/{id}/UploadCoaFile")
//   .method("put")
//   .create();
interface UploadCoaFileRequest {
  id: string;
  Coa: Blob;
}

export const uploadCoaFile = (
  { id, Coa }: UploadCoaFileRequest,
  requestInit?: Parameters<typeof fetch>[1]
) => {
  const form = new FormData();
  form.set("Coa", Coa);
  return fetch(`${baseUrl}/api/Dynasty/${id}/UploadCoaFile`, {
    headers: {
      ...requestInit?.headers,
      "Content-Type": "multipart/form-data",
    },
    ...requestInit,
    method: "PUT",
    body: form,
  }).then((response) => response.text());
};

export const uploadCoaConfiguration = fetcher
  .path("/api/Dynasty/{id}/CoaConfiguration")
  .method("put")
  .create();
