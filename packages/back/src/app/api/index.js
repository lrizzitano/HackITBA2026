import aplication from "../app.js";

let app;

export default async function handler(req, res) {
  if (!app) {
    app = await aplication();
  }

  return app(req, res);
}