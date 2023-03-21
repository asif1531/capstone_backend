// import {
//   createMeeting,
//   updateMeetingStatus,
// } from "../services/meetingServices.js";

// // export async function sendMeetingRequestHandler(req, res) {
// //   try {
// //     const requesterId = req.body.id;
// //     const receiverId = req.body.receiverId;
// //     const startDateTime = req.body.startDateTime;
// //     const endDateTime = req.body.endDateTime;

// //     const meeting = await createMeeting(
// //       requesterId,
// //       receiverId,
// //       startDateTime,
// //       endDateTime
// //     );

// //     res.status(201).json(meeting);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Internal server error", error });
// //   }
// // }

// export async function sendMeetingRequestHandler(req, res) {
//   try {
//     // const requesterId = req.body.id;
//     // const receiverId = req.body.receiverId;
//     // const startDateTime = req.body.startDateTime;
//     // const endDateTime = req.body.endDateTime;

//     // const meeting = await createMeeting(
//     //   requesterId,
//     //   receiverId,
//     //   startDateTime,
//     //   endDateTime
//     // );
//     const meeting = await createMeeting(req.body);
//     if (meeting.status === "error") {
//       return res.status(401).send(meeting.message);
//     } else {
//       return res.status(200).json(meeting);
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// }

// export async function acceptMeetingRequestHandler(req, res) {
//   try {
//     const meetingId = req.params.id;
//     const updatedMeeting = await updateMeetingStatus(meetingId, "accepted");

//     if (!updatedMeeting) {
//       return res.status(404).json({ message: "Meeting not found" });
//     }

//     res.json(updatedMeeting);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

// export async function rejectMeetingRequestHandler(req, res) {
//   try {
//     const meetingId = req.params.id;
//     const updatedMeeting = await updateMeetingStatus(meetingId, "rejected");

//     if (!updatedMeeting) {
//       return res.status(404).json({ message: "Meeting not found" });
//     }

//     res.json(updatedMeeting);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

import {
  createMeeting,
  updateMeetingStatus,
} from "../services/meetingServices.js";

export async function sendMeetingRequestHandler(req, res) {
  try {
    const meeting = await createMeeting(req.body);

    if (meeting.status === "error") {
      return res.status(401).send(meeting.message);
    } else {
      return res.status(200).json(meeting);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}

export async function acceptMeetingRequestHandler(req, res) {
  try {
    const meetingId = req.params.id;
    const updatedMeeting = await updateMeetingStatus(meetingId, "accepted");

    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(updatedMeeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function rejectMeetingRequestHandler(req, res) {
  try {
    const meetingId = req.params.id;
    const updatedMeeting = await updateMeetingStatus(meetingId, "rejected");

    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(updatedMeeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
