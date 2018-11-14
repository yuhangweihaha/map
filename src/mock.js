// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function () {
  //所有
  let articles = [];
  for (let i = 0; i < 16; i++) {
    let newArticleObject = {
      id: Random.increment(), //详细列表id
      date: Random.natural(0, 1000000000), //  设备编号
      name: Random.natural(0, 3), // Random.cname() 0-3状态
      address: Random.date() + ' ' + Random.time(), //最新上报时间
      names: Random.natural(0, 10000), // 井盖编号
      Manufacturer: Random.ctitle(3, 8),  //生产厂家
      Installation: Random.ctitle(3, 7),   //安装单位s
      ManagementUnit: Random.ctitle(3, 9),  //管理单位
      installDate: Random.date(), // 安装日期
      ServiceLife: Random.natural(1, 100), // 使用寿命
      coordinateX: Random.float(116, 117, 6, 5), //坐标x
      coordinateY: Random.float(40, 41, 6, 5), //坐标Y
      selectPerson: []
    };
    articles.push(newArticleObject)
  }
  //警报
  let aiu = [];
  for (let i = 0; i < 4; i++) {
    let newArticleObject = {
      id: Random.increment(), //详细列表id
      date: Random.natural(0, 1000000000), //  设备编号
      name: Random.natural(3, 3), // Random.cname() 状态（全部是警告）
      address: Random.date() + ' ' + Random.time(), //最新上报时间
      names: Random.natural(0, 10000), // 井盖编号
      Manufacturer: Random.ctitle(3, 8),  //生产厂家
      Installation: Random.ctitle(3, 7),   //安装单位
      ManagementUnit: Random.ctitle(3, 9),  //管理单位
      installDate: Random.date(), // 安装日期
      ServiceLife: Random.natural(1, 100), // 使用寿命
      coordinateX: Random.float(116, 116, 6, 5), //坐标x
      coordinateY: Random.float(40, 40, 6, 5), //坐标Y
      selectPerson: []
    };
    aiu.push(newArticleObject)
  }
  // 离线
  let Offline = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      id: Random.increment(), //详细列表id
      date: Random.natural(0, 1000000000), //  设备编号
      name: Random.natural(1, 1), // Random.cname() 状态（离线）
      address: Random.date() + ' ' + Random.time(), //最新上报时间
      names: Random.natural(0, 10000), // 井盖编号
      Manufacturer: Random.ctitle(3, 8),  //生产厂家
      Installation: Random.ctitle(3, 7),   //安装单位
      ManagementUnit: Random.ctitle(3, 9),  //管理单位
      installDate: Random.date(), // 安装日期
      ServiceLife: Random.natural(1, 100), // 使用寿命
      coordinateX: Random.float(116, 117, 6, 5), //坐标x
      coordinateY: Random.float(40, 41, 6, 5), //坐标Y
      selectPerson: []
    };
    Offline.push(newArticleObject)
  }
  //超时
  let overtime = [];
  for (let i = 0; i < 6; i++) {
    let newArticleObject = {
      id: Random.increment(), //详细列表id
      date: Random.natural(0, 1000000000), //  设备编号
      name: Random.natural(2, 2), // Random.cname() 状态（超时）
      address: Random.date() + ' ' + Random.time(), //最新上报时间
      names: Random.natural(0, 10000), // 井盖编号
      Manufacturer: Random.ctitle(3, 8),  //生产厂家
      Installation: Random.ctitle(3, 7),   //安装单位
      ManagementUnit: Random.ctitle(3, 9),  //管理单位
      installDate: Random.date(), // 安装日期
      ServiceLife: Random.natural(1, 100), // 使用寿命
      coordinateX: Random.float(116, 117, 6, 5), //坐标x
      coordinateY: Random.float(40, 41, 6, 5), //坐标Y
      selectPerson: []
    };
    overtime.push(newArticleObject)
  }
  return {
    articles: articles,
    aiu: aiu,
    Offline: Offline,
    overtime: overtime
  }
};
const Warningcovers = function () {
  let Secondcover = [];
  for (let i = 0; i < 2; i++) {
    let Warning = {
      date: Random.natural(0, 1000000000),// 设备编号
      name: Random.natural(0, 10000), // 井盖编号
      address: Random.date() + ' ' + Random.time(), //安装日期
      Manufacturer: Random.ctitle(3, 8),  //生产厂家
      Installation: Random.ctitle(3, 7),   //安装单位
      ManagementUnit: Random.ctitle(3, 9),  //管理单位
      installDate: Random.date(), // 安装日期
      ServiceLife: Random.natural(1, 100), // 使用寿命
      coordinateX: Random.float(116, 117, 6, 5), //坐标x
      coordinateY: Random.float(40, 41, 6, 5) //坐标Y
    };
    Secondcover.push(Warning)
  }

  return {
    Secondcover: Secondcover
  }
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock('/news/api', 'post', Warningcovers);
