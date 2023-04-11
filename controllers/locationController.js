import { findLocation } from "../services/locationService.js";

export async function findLocationController(req, res) {
  try {
    let location = await findLocation(req.body);
    if (location.status == "error") {
      return res.status(400).json({ error: location.message });
    } else {
      return res.status(200).json({ resData: location });
    }
  } catch (err) {
    return res.status(400).json({ error: "Location not found" });
  }
}
