import mongoose from "mongoose";

const sizesSchema = mongoose.Schema({
  sizeName: String,

  sizes: [
    {
      size: {
        type: String,
      },
      sizeIndex: {
        type: Number,
      },
  
    },
  ],
  sizeChart:{
    type:Object,
    
  }
});

const Size = mongoose.model("Size", sizesSchema);
export default Size;
