import Conversation from "../model/Conversation.js";

export const newConversation = async(req,res)=>{
    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        
        const exist = await Conversation.findOne({members:{$all:[receiverId,senderId]}});
        console.log(exist);
        if(exist){
            return res.status(200).json('Conversation Exits');
        }
        console.log("yetay");
        const newConversation = new Conversation({
            members:[senderId,receiverId],
        });
        await newConversation.save();
        return res.status(200).json("Conversation Saved Successfully");
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getConversation = async(req,res)=>{
    
    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        let conversation = await Conversation.findOne({members:{$all:[receiverId,senderId]}});
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}