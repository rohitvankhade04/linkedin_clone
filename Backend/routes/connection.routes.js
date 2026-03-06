import express from "express";
import isAuth from "../middlewares/isAuth.js"
import { sendConnection,acceptConnection,rejectConnection,getConnectionStatus ,removeConnection,getAllConnectionRequests,getUserConnections} from "../controllers/connections.controller.js";
const connectionsRouter=express.Router();

connectionsRouter.get("/send/:id",isAuth,sendConnection)
connectionsRouter.get("/accept/:connectionId",isAuth,acceptConnection)
connectionsRouter.get("/reject/:connectionId",isAuth,rejectConnection)
connectionsRouter.get("/getstatus/:userId",isAuth,getConnectionStatus)
connectionsRouter.get("/remove/:userId",isAuth,removeConnection)
connectionsRouter.get("/getallrequests",isAuth,getAllConnectionRequests)
connectionsRouter.get("/",isAuth,getUserConnections)
export default connectionsRouter;