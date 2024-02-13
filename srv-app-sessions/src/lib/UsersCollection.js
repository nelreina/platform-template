import logger from "../config/logger.js";
import { pbAdmin } from "../config/pocketbase.js";
import { client as redis } from "../config/redis-client.js";

// Subscribe to changes in any users record
export default () => {
  return {
    subscribe: () =>
      pbAdmin.collection("users").subscribe("*", async (event) => {
        // logger.info("User event: " + JSON.stringify(event));
        const { action, record } = event;
        const { id, role, email, verified } = record;
        switch (action) {
          case "update":
            // User created in console
            if (verified === true && role === "ADMIN") {
              // await pbAdmin.collection("users").requestPasswordReset(email);
            }

            break;
          case "create":
            if (role === "ADMIN") {
            }

          default:
            break;
        }
      }),
  };
};

// Subscribe to changes in any users record
