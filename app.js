// Express 기본 모듈 불러오기
const express = require("express"),
  http = require("http"),
  path = require("path");

// Express의 미들웨어 불러오기
const bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  static = require("serve-static"),
  errorHandler = require("errorhandler");

const expressErrorHandler = require("express-error-handler");
const expressSession = require("express-session");
// const config = require("./config");
// const database = require("./database/database");
// const route_loader = require("./routes/route_loader");
const app = express();

//===== 뷰 엔진 설정 == pug =====//
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
console.log("뷰 엔진이 pug로 설정되었습니다.");

//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
app.set("port", process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use("/public", static(path.join(__dirname, "public")));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
);

//라우팅 정보를 읽어들여 라우팅 설정
// route_loader.init(app, express.Router());

//===== 404 에러 페이지 처리 =====//
const expressErrorHandlerApply = expressErrorHandler({
  static: {
    "404": "./public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on("uncaughtException", function(err) {
  console.log("uncaughtException 발생함 : " + err);
  console.log("서버 프로세스 종료하지 않고 유지함.");

  console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on("SIGTERM", function() {
  console.log("프로세스가 종료됩니다.");
  app.close();
});

app.on("close", function() {
  console.log("Express 서버 객체가 종료됩니다.");
  if (database.db) {
    database.db.close();
  }
});

// 시작된 서버 객체를 리턴받도록 합니다.
const server = http.createServer(app).listen(app.get("port"), function() {
  console.log("서버가 시작되었습니다. 포트 : " + app.get("port"));

  // 데이터베이스 초기화
  //   database.init(app, config);
});
