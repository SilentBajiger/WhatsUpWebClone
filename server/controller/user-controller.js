import User from "../model/User.js"

export const addUser = async(req,res)=>{
    console.log("allo");
    try {
        const exist = await User.findOne({sub:req.body.sub});
        console.log(exist);
        if(exist){
            return res.status(200).json({msg:"User Already Exists"});
        }
        const newUser = new User(req.body);
        const Saved = await newUser.save();
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getUsers = async(req,res)=>{
    try {
        
        const users = await User.find({});
        // console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

