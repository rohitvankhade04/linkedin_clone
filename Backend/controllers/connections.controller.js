import User from "../models/usersmodel.js"
import Connections from "../models/connections.model.js"
export const sendConnection = async (req, res) => {
   try {
      let { id } = req.params;
      let sender = req.userId;
      let user = await User.findById(sender)

      if (sender == id) {
         return res.status(400).json({ message: "you cannot send request to urself" })
      }

      if (user.connections.includes(id)) {
         return res.status(400).json({ message: "you are already connected" })
      }

      let existingConnection = await Connections.findOne({
         sender,
         reciever: id,
         status: "pending"

      })
      if (existingConnection) {
         return res.json({ message: "already request is pending cannot make a new request" })
      }

      let newRequest = await Connections.create({
         sender,
         reciever: id,

      })
      console.log("--------from sendConnection endpoint success---------")
      console.log(newRequest)
      console.log("----------------------------------------------")
      return res.status(200).json({ message: "new reuest is made to the user" + id })

   } catch (error) {
      console.log("--------from sendConnection endpoint fail---------")
      console.log(error)
      console.log("----------------------------------------------")
      return res.json(error)
   }
}

export const acceptConnection = async (req, res) => {
   try {
      let { connectionId } = req.params;
      let connection = await Connections.findById(connectionId)
      if (!connection) {
         return res.status(400).json({ message: "connection does not exist" })
      }
      if (connection.status != "pending") {
         return res.status(400).json({ message: "request under process" })
      }
      connection.status = "accepted";
      await connection.save()
      await User.findByIdAndUpdate(req.userId, { $addToSet: { connections: connection.sender._id } })
      await User.findByIdAndUpdate(connection.sender._id, { $addToSet: { connections: connection.userId } })
      console.log("--------from acceptConnection endpoint success---------")
      console.log(connection)
      console.log("----------------------------------------------")
      return res.status(200).json({ message: "connection accepted" })

   } catch (error) {
      console.log("--------from accpetConnection endpoint fail---------")
      console.log(error)
      console.log("----------------------------------------------")
      return res.status(200).json({
         message: "connection accept error"
      })
   }
}
export const rejectConnection = async (req, res) => {
   try {
      let { connectionId } = req.params;
      let connection = await Connections.findById(connectionId)
      if (!connection) {
         return res.status(400).json({ message: "connection does not exist" })
      }
      if (connection.status != "pending") {
         return res.status(400).json({ message: "request under process" })
      }
      connection.status = "rejected";
      await connection.save();
      console.log("--------from rejectConnection endpoint success---------")
      console.log(connection)
      console.log("----------------------------------------------")
      return res.status(200).json({ message: "connection accepted" })

   } catch (error) {
      console.log("--------from rejectConnection endpoint fail---------")
      console.log(error)
      console.log("----------------------------------------------")
      return res.status(200).json({
         message: "connection accept error"
      })
   }
}
export const getConnectionStatus = async (req, res) => {
   try {
      const targetUserId = req.params.userId;
      const currentUserId = req.userId;
      let currentUser = await User.findOne(currentUserId);
      if (currentUser.connections.includes(targetUserId)) {
         return res.json({ status: "disconnect" })
      }
      let pendingConnection = await Connections.findOne({
         $or: [{ sender: currentUserId, reciever: targetUserId },
         { sender: targetUserId, reciever: currentUserId }
         ],
         status: "pending"
      })
      if (pendingConnection.sender.toString() == currentUserId.toString()) {
         return res.json({ message: "pending" })
      }
      else {
         return res.json({ message: "recieved", pendingconnection: pendingConnection._id })
      }

      return res.json({ message: "Connect" })

   } catch (error) {
      console.log("--------from getConnectionStatus endpoint fail---------")
      console.log(error)
      console.log("----------------------------------------------")
      return res.status(500).json({ message: "getConnectionStatus error" })
   }


}
export const removeConnection = async (req, res) => {
   try {
      let myId = req.userId;
      let otherUserId = req.params.userId;

      await User.findByIdAndUpdate(myId, { $pull: { connections: otherUserId } });
      await User.findByIdAndUpdate(otherUserId, { $pull: { connections: myId } });
      res.json({ message: "connection removed sucessfuly" })
   } catch (error) {
      console.log("--------from removeConnection endpoint fail---------")
      console.log(error)
      console.log("----------------------------------------------")
      return res.json({ message: "removeConnection error" })
   }

}
export const getAllConnectionRequests = async (req, res) => {
   try {
      let userId = req.userId;
      let requests = await Connections.find({ reciever: userId, status: "pending" }).populate("sender", "firstName lastName email userName profileImage headline");
      return res.status(200).json(requests);
   } catch (error) {
      console.log("--------from getAllConnectionRequests endpoint fail---------")
      console.log(error)
      console.log("----------------------------------------------")
      return res.status(500).json({ message: "server error" })
   }

}
export const getUserConnections = async (req, res) => {
   try {
      let userId = req.userId;
      let user = await User.findById(userId).populate("connections", "firstName lastName email userName profileImage headline connections");
      return res.json(user.connections);
   } catch (error) {
      console.log("--------from getUserConnections endpoint fail---------")
      console.log(error)
      console.log("----------------------------------------------")
      return res.status(500).json({ message: "server error" })
   }

}
