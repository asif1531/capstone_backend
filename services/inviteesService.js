import Invitee from "../models/invitees.js";

export async function allInvitees() {
  return Invitee.find({});
}
