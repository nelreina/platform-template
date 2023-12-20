import { fail } from "@sveltejs/kit";
import { uploadDocument } from "$lib/server/rest-client/paperless.js";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const document = formData.get("document")?.valueOf();
    if (!document) {
      return fail(400, { error: "No file uploaded" });
    }

    // console.log(document, document?.name, document?.type, document?.size);
    const reference = await uploadDocument(formData, fetch, [
      "trackingNumber",
      "weight",
    ]);
    if (reference) {
      return {
        success: "File uploaded successfully! Reference: " + reference,
      };
    } else {
      return fail(400, { error: "Error uploading file" });
    }
  },
};
