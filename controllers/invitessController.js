import { allInvitees } from "../services/inviteesService.js";

export async function getAllInviteesController(req, res) {
  try {
    let allinvitess = await allInvitees();
    if (!allinvitess) {
      res.status(400).json({ error: "invites data notfound" });
    }
    return res.status(200).json({ data: allinvitess });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "invite failed from controller catch" });
  }
}
