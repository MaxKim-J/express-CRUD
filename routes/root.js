const addPost = (postInfo, database, callback) => {
  const post = new database.postModel({ ...postInfo });
  post.save(function(err) {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    console.log("사용자 데이터 추가함");
    callback(null, post);
  });
};

const postPostCreate = (req, res) => {
  console.log("게시물 작성 포스트요청");
  const postBody = req.body;
  const database = req.app.get("database");
  if (database.db) {
    addPost(postBody, database, function(err, docs) {
      if (err) {
        return;
      }
      if (docs) {
        res.redirect("/");
      }
    });
  }
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
  const database = req.app.get("database");
  const context = {};
  if (database.db) {
    database.postModel.getAllPosts((err, results) => {
      if (results.length > 1) {
        context.results = results;
      }
      req.app.render("postList", context, function(err, html) {
        res.end(html);
      });
    });
  }
};

const getPostDetail = (req, res) => {
  // 디비 컬렉션에서 특정 포스트를 가져와야함
  const paramId = req.params.id;
  const database = req.app.get("database");

  if (database.db) {
    database.postModel.getPosts(paramId, function(err, results) {
      if (results.length === 1) {
        console.dir(results);
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        const context = { id: paramId, results: results };
        console.log(context);
        req.app.render("postDetail", context, function(err, html) {
          res.end(html);
        });
      } else {
        console.log("없음");
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write(`<h3>${paramId}번 포스트가 존재하지 않습니다.</h3>`);
        res.write('<a href="/">뒤로가기</a>');
        res.end();
      }
    });
  }
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
