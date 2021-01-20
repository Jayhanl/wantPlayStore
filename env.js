// .env.js 文件
// 不同环境访问不同的路径
// import store from '@/common/store/index'

//登录接口
const ENV_LOGIN_URL = {
	development: 'https://wp.yx-maker.com/merchant/', //开发环境
	production: 'https://wp.yx-maker.com/merchant/', //生产环境
}

//项目接口
const ENV_API_URL = {
	development: 'http://192.168.3.41:8100/merchant/', //开发环境 http://192.168.3.41:8100
	production: 'https://wp.yx-maker.com/merchant/', //生产环境 https://wp.yx-maker.com
}

//项目接口BIN
const ENV_API_URL_BIN = {
	development: 'http://192.168.3.30:8080/discount/', //开发环境 http://192.168.3.30:8080
	production: 'https://wp.yx-maker.com/discount/', //生产环境
}

const ENV = 'production' // production development

//图片上传
const IMG_UPLOAD_URL ='http://cdn.nccnt.com/';

//高德地图
const GAODE_URL ='https://restapi.amap.com/';

// process.env.NODE_ENV
export const LOGIN_URL = ENV_LOGIN_URL[ENV]; //后台根域名
export const API_URL = ENV_API_URL[ENV]; //后台接口域名
export const API_URL_BIN = ENV_API_URL_BIN[ENV]; //后台接口域名
export const MAP_URL = GAODE_URL; //地图接口
export const IMG_URL = IMG_UPLOAD_URL; //图片上传接口