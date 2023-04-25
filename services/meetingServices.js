import Meeting from "../models/meetings.js";
import Invitee from "../models/invitees.js";

export async function getAllMeetings() {
  return await Meeting.find({}).sort({ createdAt: -1 });
}

export async function createMeeting(
  data
  // meetingName,
  // description,
  // requesterId,
  // receiverIds,
  // startDateTime,
  // endDateTime
) {
  const {
    meetingName,
    description,
    requesterId,
    receiverIds,
    startDateTime,
    endDateTime,
  } = data;
  try {
    const meeting = await Meeting.create({
      meetingName,
      description,
      requesterId,
      receiverIds,
      startDateTime,
      endDateTime,
    });

    // Add meeting to invitees of each receiver
    for (const receiverId of receiverIds) {
      await Invitee.create({
        meetingId: meeting._id,
        receiverId,
        status: "pending",
      });
    }

    return meeting;
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Error while creating meeting" };
  }
}

export async function UpdateMeeting(data) {
  let {
    meetingName,
    description,
    receiverIds,
    startDateTime,
    endDateTime,
    _id,
  } = data;
  // let {meetingName,_id} = data;

  try {
    let meetingData = await Meeting.findById(_id);
    console.log(meetingData);
    if (!meetingData) {
      return { status: "error", message: "Meeting is not find fro update" };
    } else {
      console.log("leterr ", meetingData);

      if (meetingName !== undefined && meetingName !== "") {
        meetingData.meetingName = meetingName;
        console.log("leterr from ", meetingData.meetingName);
      }
      if (description !== undefined && description !== "") {
        meetingData.description = description;
      }
      if (startDateTime !== undefined && startDateTime !== "") {
        meetingData.startDateTime = startDateTime;
      }
      if (endDateTime !== undefined && endDateTime !== "") {
        meetingData.endDateTime = endDateTime;
      }
      if (receiverIds.length > 0) {
        const uniqueReceiverIds = receiverIds.filter(
          (newReceiverId) => !meetingData.receiverIds.includes(newReceiverId)
        );
        meetingData.receiverIds =
          meetingData.receiverIds.concat(uniqueReceiverIds);

        for (const receiver of uniqueReceiverIds) {
          await Invitee.create({
            meetingId: meetingData._id,
            receiverId: receiver,
            status: "pending",
          });
        }
      }

      meetingData.save();
      return {
        status: "success",
        message: "Meeting data updated",
        meetingData,
      };
    }
  } catch (e) {
    return {
      status: "error",
      message: "Error from update meeting data catch service",
    };
  }
}

// export async function updateMeetingStatus(meetingId, receiverId, status) {
//   console.log(meetingId, receiverId, status);
//   try {
//     const invitee = await Invitee.findOneAndUpdate(
//       { meetingId, receiverId },
//       { status },
//       { new: true }
//     ).populate("meetingId");

//     console.log(invitee);
//     if (!invitee) {
//       return { status: "error", message: "Invitee not found" };
//     }

//     // Check if all invitees have accepted/rejected the meeting
//     const allInvitees = await Invitee.find({ meetingId });

//     console.log("Demo", allInvitees);

//     const allInviteesStatuses = allInvitees.map((invitee) => invitee.status);
//     console.log("second", allInviteesStatuses);
//     if (!allInviteesStatuses.includes("pending")) {
//       const meeting = await Meeting.findByIdAndUpdate(
//         meetingId,
//         { status: "completed" },
//         { new: true }
//       )
//         .populate("requesterId")
//         .populate("receiverIds");
//       return meeting;
//     }

//     return invitee.meetingId;
//   } catch (error) {
//     console.error(error);
//     return { status: "error", message: "Error updating meeting status" };
//   }
// }

export async function updateMeetingStatus(meetingId, receiverId, status) {
  console.log("data ", meetingId, receiverId, status);
  try {
    // let {meetingId, receiverId, status}=updatedata;

    let invitess = await Invitee.findOneAndUpdate(
      { meetingId, receiverId },
      { status },
      { new: true }
    );
    // ).populate("meetingId");
    console.log("data1 ", invitess);

    if (!invitess) {
      return { status: "error", message: "invitess not finde" };
    }
    let allInviteess = await Invitee.find({ meetingId });

    let allInviteessStatues = allInviteess.map((invitess) => invitess.status);

    if (!allInviteessStatues.includes("pending")) {
      let meeting = await Meeting.findByIdAndUpdate(
        meetingId,
        { status: "completed" },
        { new: true }
      );

      // .populate("requesterId")
      // .populate("receiverIds");
      return meeting;
    }

    return invitess.meetingId;
  } catch (e) {
    return {
      status: "error",
      message: "Error from service updating meeting status",
    };
  }
}
