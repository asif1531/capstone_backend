import Meeting from "../models/meetings.js";
import User from "../models/user.js";

export async function createMeeting(
  requesterId,
  receiverId,
  startDateTime,
  endDateTime
) {
  let user = await User.findOne({ _id: requesterId });
  if (!user) {
    throw new Error("User not found");
  }
  let userId = user._id;
  const meeting = new Meeting({
    requester: userId,
    receiver: receiverId,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  });

  await meeting.save();
  return meeting;
}

export async function getMeetingById(meetingId) {
  return await Meeting.findById(meetingId);
}
// export async function createMeeting(
//   requesterId,
//   receiverId,
//   startDateTime,
//   endDateTime
// ) {
//   console.log("requesterId:", requesterId);
//   let user = await User.findOne({ _id: requesterId });
//   console.log("user:", user);
//   if (!user) {
//     throw new Error("User not found");
//   }
//   let userId = user._id;
//   const meeting = new Meeting({
//     requester: userId,
//     receiver: receiverId,
//     startDateTime: startDateTime,
//     endDateTime: endDateTime,
//   });

//   await meeting.save();
//   return meeting;
// }

export async function updateMeetingStatus(meetingId, newStatus) {
  const meeting = await getMeetingById(meetingId);
  meeting.status = newStatus;
  await meeting.save();
  return meeting;
}
