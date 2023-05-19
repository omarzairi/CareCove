import Comment from "../models/Comment.js"
import Patient from "../models/Patient.js"
const commentService = {
    async createComment({text,rating,date,doctor,patient})
    {
        const foundPatient = await Patient.findById(patient).populate('person');
        if (!foundPatient) {
          throw new Error('Patient not found');
        }
        const comment = await Comment.create({
          text,
          rating,
          date,
          doctor,
          patient: foundPatient.person._id // Set patient to the corresponding person ID
        });
        return await comment.save();
    },


    async getAllComments()
    {
        const comments = await Comment.find();
        return comments.map((comment)=> comment.toObject());
    },


    async deleteComment(commentId) {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new Error('an Error has occured');
        }
            await Comment.findByIdAndDelete(commentId);
            return comment.toObject();
        
    },
    async getCommentsByDoctorId(doctorId) {
        const comments = await Comment.find({ doctor: doctorId }).populate("patient");
        if (!comments) {
          throw new Error("Comments not found");
        }
        return comments.map((comments) => comments.toObject());
      },


};
export default commentService;