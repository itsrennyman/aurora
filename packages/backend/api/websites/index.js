import { WebsiteController } from "../../lib/controllers/website-controller";
import { authentication } from "../../lib/middleware/authentication";
import { Router } from "../../lib/router";

export default async function handler(request, response) {
  const router = new Router(request, response);

  await router.use(authentication);
  await router.route("GET", WebsiteController.index);

  router.fallback();
}