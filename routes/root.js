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
  // 디비에서 포스트 리스트를 가져와야함
  req.app.render("postList", function(err, html) {
    res.end(html);
  });
};

const getPostDetail = (req, res) => {
  // 디비 컬렉션에서 특정 포스트를 가져와야함
  const paramId = req.params.id;
  const context = { id: paramId };
  console.log(req);
  req.app.render("postDetail", context, function(err, html) {
    res.end(html);
  });
};

const getPostCreate = (req, res) => {
  // 포스트 요청 보내야함
  req.app.render("postInput", function(err, html) {
    res.end(html);
  });
};

module.exports.postPostCreate = postPostCreate;
module.exports.postPostDelete = postPostDelete;
module.exports.postPostUpdate = postPostUpdate;
module.exports.getPosts = getPosts;
module.exports.getPostDetail = getPostDetail;
module.exports.getPostCreate = getPostCreate;
