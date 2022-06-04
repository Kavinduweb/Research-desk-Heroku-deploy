const groupdetails = require("../models/groupModel");



const getAllGroups = async (req, res) => {
    let groups;

    try {
        groups = await groupdetails.find();
    } catch (err) {
        console.log(err);
    }

    if (!groups) {
        return res.status(404).json({ message: "No Groups Found" });
    }
    return res.status(200).json({ groups });
};



const getById = async (req, res) => {
    const id = req.params.id;

    let group;

    try {
        group = await groupdetails.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!group) {
        return res.status(404).json({ message: "No Group Found" });
    }
    return res.status(200).json({ group });
};



const addGroup = async (req, res) => {
    const {userid, student_id1, student_id2, student_id3, student_id4, groupname } = req.body;

    let group;

    try {
        group = new groupdetails({
            userid,
            student_id1,
            student_id2,
            student_id3,
            student_id4,
            groupname,
        
        });
        await group.save();
    } catch (err) {
        console.log(err);
    }
    if (!group) {
        return res.status(500).json({ message: "Unable to Add" });
    }
    return res.status(201).json({ group });
};



const updateGroup = async (req, res) => {
    const id = req.params.id;
    const {userid, student_id1, student_id2, student_id3, student_id4, groupname, groupid } = req.body;

    let group;

    try {
        group = await groupdetails.findByIdAndUpdate(id, {
            userid,
            student_id1,
            student_id2,
            student_id3,
            student_id4,
            groupname,
            groupid
        });
        group = await group.save();
    } catch (err) {
        console.log(err);
    }
    if (!group) {
        return res.status(404).json({ message: "Unable to Update by this Id" });
    }
    return res.status(200).json({ group });
};



const deleteGroup = async (req, res) => {
    const id = req.params.id;

    let group;

    try {
        group = await groupdetails.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!group) {
        return res.status(404).json({ message: "Unable to Delete by this Id" });
    }
    return res.status(200).json({ message: "Group Successfully Deleted" });

};

const getbyUser = async (req, res) => {

    try {

        let group = await groupdetails.find({ userid: req.params.userid })
     
        res.json(group);
    
    } catch (err) {
        console.log(err)
    }



}




exports.getAllGroups = getAllGroups;
exports.addGroup = addGroup;
exports.getById = getById;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
exports.getbyUser = getbyUser;