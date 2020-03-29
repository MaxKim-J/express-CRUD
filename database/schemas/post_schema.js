const Schema = {};

Schema.createSchema = mongoose => {
  const postSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true, default: "" },
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, index: { unique: false }, default: Date.now }
  });

  //! 메소드를 스키마에 붙인다 => 쿼리 작성
  // 게시물 작성 : 게시물 작성하기
  // 게시물 삭제 : 삭제하기
  // 게시물 조회 : 전체 게시글

  return postSchema;
};

module.exports = Schema;
