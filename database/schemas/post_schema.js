const mongoose = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");
const connection = mongoose.createConnection("mongodb://localhost:27017/local");
autoIncrement.initialize(connection);

const Schema = {};

Schema.createSchema = mongoose => {
  const postSchema = mongoose.Schema({
    id: { type: Number },
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, index: { unique: false }, default: Date.now }
  });

  postSchema.plugin(autoIncrement.plugin, {
    model: "postModel",
    field: "id",
    startAt: 1,
    increment: 1
  });

  //! 메소드를 스키마에 붙인다 => 쿼리 작성
  // 게시물 조회 : 전체 게시글
  postSchema.static("getAllPosts", function(callback) {
    return this.find({}, callback);
  });
  // 게시물 디테일 조회 : id로 조회하기
  postSchema.static("getPosts", function(id, callback) {
    return this.find({ id: id }, callback);
  });

  return postSchema;
};

module.exports = Schema;
