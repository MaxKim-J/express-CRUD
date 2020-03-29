const config = require("../config");

const route_loader = (app, router) => {
  console.log("라우터 1 - 이제 우리는 앱에 라우터를 붙일거에용");
  return initRoutes(app, router);
};

const initRoutes = (app, router) => {
  const { route_info } = config;
  console.log(`라우터 2 - ${route_info.length}개의 라우터를 만들겠어요`);

  route_info.forEach(route => {
    const routeModule = require(route.file);
    console.log(`라우터 3 - ${route.file}모듈 정보를 읽어왔어요`);

    route.type === "post"
      ? router.route(route.path).post(routeModule[route.method])
      : router.route(route.path).get(routeModule[route.method]);

    console.log(`라우터 4 - 라우팅 모듈 ${route.method}가 설정됨`);
  });

  // 라우터 객체 맵에 등록
  app.use("/", router);
};

module.exports = route_loader;
