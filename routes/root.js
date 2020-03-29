const postPostCreate = (req, res) => {
  console.log("게시물 작성 포스트요청");
  res.end();
};

const postPostDelete = (req, res) => {
  console.log("게시물 삭제 포스트요청");
  res.end();
};

const postPostUpdate = (req, res) => {
  console.log("게시물 수정 포스트요청");
  res.end();
};

const getPosts = (req, res) => {
  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h2>게시글 목록</h2>");
  res.end();
};

const getPostDetail = (req, res) => {
  var paramId = req.body.id || req.query.id;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write(`<h2>${paramId}번 게시물 디테일이다!</h2>`);
  res.end();
};

module.exports.postPostCreate = postPostCreate;
module.exports.postPostDelete = postPostDelete;
module.exports.postPostUpdate = postPostUpdate;
module.exports.getPosts = getPosts;
module.exports.getPostDetail = getPostDetail;
