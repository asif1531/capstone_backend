import Meeting from "../models/meetings.js";
import User from "../models/user.js";

// export async function createMeeting(
//   username,
//   meetingDesc,
//   requesterId,
//   receiverId,
//   startDateTime,
//   endDateTime
// ) {
//   let user = await User.find({ username: username });
//   if (!user) {
//     throw new Error("User not found");
//   }

//   const meeting = new Meeting({
//     meetingDesc: meetingDesc,
//     requester: requesterId,
//     receiver: receiverId,
//     startDateTime: startDateTime,
//     endDateTime: endDateTime,
//   });
//   let userId = [];
//   userId.push(receiverId);
//   return await Meeting.insertMany(meeting);

//   // await meeting.save();
//   // return meeting;
// }

// export async function createMeeting(data) {
//   let user = await User.find({ username: data.username });
//   if (!user) {
//     return {
//       status: "error",
//       message: "User not found in our database",
//     };
//     // throw new Error("User not found");
//   }
//   let receiverIds = data.receiverId;
//   data.receiverId = receiverIds;
//   let meetings = [];
//   meetings.push(data);
//   return await Meeting.insertMany(data);
// }

export async function createMeeting(data) {
  let user = await User.findOne({ phoneNumber: data.phoneNumber });
  if (!user) {
    return {
      status: "error",
      message: "User not found in our database",
    };
  }

  const meeting = new Meeting({
    meetingDesc: data.meetingDesc,
    requester: data.requesterId,
    receiver: data.receiverId,
    startDateTime: data.startDateTime,
    endDateTime: data.endDateTime,
  });

  const createdMeeting = await meeting.save();
  return createdMeeting;
}

export async function getMeetingById(meetingId) {
  return await Meeting.findById(meetingId);
}

export async function updateMeetingStatus(meetingId, newStatus) {
  const meeting = await getMeetingById(meetingId);
  meeting.status = newStatus;
  await meeting.save();
  return meeting;
}
