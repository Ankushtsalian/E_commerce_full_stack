const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please Provide name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: String,
      required: [true, "Please Provide Product Price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please Provide Product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: String,
      default: "/example.jpg",
    },
    category: {
      type: String,
      required: [true, "Please Provide Product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please Provide company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
      default: ["#222"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  //needed for virtual setup in next line for review access
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//virtual connection btw  localField: "_id" AND foreignField: "product"
// this will connect and adds all review matches rating 5
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: { rating: 5 },
});

//Basically when you remove product remove hook is triggered
//but all your reviewa associated to product aren't removed from db
//so this pre func get triggered when product removed
//deletes all review associated with this product
productSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", productSchema);
