// import User from "../models/user.js";

// export async function findLocation(data) {
//   let { userId, lat, long } = data;

//   if (!userId) {
//     return {
//       status: "error",
//       message: "User Id is required",
//     };
//   } else {
//     try {
//       let user = await User.findById({ userId });
//       if (!user) {
//         return {
//           status: "error",
//           message: "Sorry User is not available in our database",
//         };
//       } else {
//         user.location.lat = lat;
//         user.location.long = long;
//         await user.save();
//         return user;
//       }
//     } catch (err) {
//       throw new Error("Location is Not Find in geolocation ", err);
//     }
//   }
// }
import User from "../models/user.js";

export async function findLocation(data) {
  let { phonNumber, lat, long } = data;

  if (!phonNumber) {
    return {
      status: "error",
      message: "phonNumber and  is not coming ",
    };
  } else {
    try {
      let user = await User.findOne({ phonNumber });
      if (!user) {
        return {
          status: "error",
          message: "This User Not Exist In Our Data Base",
        };
      } else {
        //updating location of schemaa
        user.Location.lat = lat;
        user.Location.long = long;
        await user.save();

        return user;
      }

      //  return user;
    } catch (e) {
      throw new Error("Location is Not Find in geolocation ", e);
    }
  }
}
