import {
  UpdateMeeting,
  createMeeting,
  getAllMeetings,
  updateMeetingStatus,
} from "../services/meetingServices.js";

export async function getAllMeetingController(req, res) {
  try {
    let allMeeting = await getAllMeetings();
    return res.status(200).json(allMeeting);
  } catch (e) {
    return res
      .status(500)
      .json({ Error: "Error from controller catch getMeetings" });
  }
}

export async function createMeetingHandler(req, res) {
  try {
    // const { requesterId, receiverIds, startDateTime, endDateTime } = req.body;

    const meeting = await createMeeting(req.body);

    res.status(201).json(meeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updatemeetingController(req, res) {
  try {
    let updateMeeting = await UpdateMeeting(req.body);
    if (updateMeeting.status === "success") {
      return res.status(200).json({
        message: updateMeeting.message,
        data: updateMeeting.meetingData,
      });
    } else return res.status(500).json(updateMeeting.message);
  } catch (e) {
    res.status(400).json({ message: " meeting no updated from (catch)" }, e);
  }
}

export async function updateMeetingStatusController(req, res) {
  try {
    const { meetingId, receiverId, status } = req.body;
    let updatMeeting = await updateMeetingStatus(meetingId, receiverId, status);

    if (updatMeeting.status === "error") {
      return res.status(400).json({ message: updatMeeting.message });
    }
    return res.json(updatMeeting);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "error from updateMeeting Controller (catch)" });
  }
}

// export async function acceptMeetingRequestHandler(req, res) {
//   try {
//     const meetingId = req.params.meetingId;
//     const receiverId = req.body.receiverId;
//     const status = req.body.status;
//     const updatedMeeting = await updateMeetingStatus(
//       meetingId,
//       receiverId,
//       "accepted"
//     );

//     if (!updatedMeeting) {
//       return res.status(404).json({ message: "Meeting not found" });
//     }

//     res.json(updatedMeeting);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

export async function acceptMeetingrequestController(req, res) {
  let meetingId = req.meetingId;
  let receiverId = req.receiverId;
  let status = "accepted";

  try {
    let updateMeeting = await updateMeetingStatus(
      meetingId,
      receiverId,
      status
    );

    if (!updateMeeting) {
      return res.status(400).json({ message: "Meeting not  find" });
    }
    res.status(200).json(updateMeeting);
  } catch (e) {
    return res
      .status(500)
      .json({ mesage: "error from acceptMeeting Controller (catch)" }, e);
  }
}

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

export async function rejectMeetingrequestController(req, res) {
  let meetingId = req.meetingId;
  try {
    let rejectMeeting = await updateMeetingStatus(meetingId, null, "rejected");

    if (!rejectMeeting) {
      return res.status(400).json({ message: "Meeting not  find" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ mesage: "error from rejectMeeting Controller (catch)" }, e);
  }
}
