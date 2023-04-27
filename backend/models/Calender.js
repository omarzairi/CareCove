import { boolean } from "joi";
import mongoose from "mongoose";
const CalenderSchema= new mongoose.Schema({
   availability:{type:boolean, required:true},
   hour:{type:number, required:true},
   date:{type:Date, required:true}

});
const Calender= mongoose.model("Calender",CalenderSchema);
export default Calender;