import request from '../utils/request';
import { BASE_URL } from "../consts/env";

/**
 * prompt文档
 * https://文档链接 https://note.youdao.com/s/7t3KS3Bg 

 */
// 市场应用列表
// /v1/service/appList
// 参数
// lastMsgId
// page 分页数

export const getAppList = async payload => request.post(`${BASE_URL}/v1/service/appList`, payload);


// 个人应用列表

export const getUserAppList = async payload => request.post(`${BASE_URL}/v1/service/userAppList`, payload);

// 创建应用
export const createApp = async payload => request.post(`${BASE_URL}/v1/service/createApp`, payload);

// 删除应用

export const deleteApp = async payload => request.post(`${BASE_URL}/v1/service/delApp`, payload);

// APP详情
export const getAppDetail = params => request.post(`${BASE_URL}/v1/service/getAppInfo`, params)

// 获取公开app配置
export const getChatAppConfig = appId => request.post(`${BASE_URL}/v1/service/getChatAppConfig`, { appId })

// APP配置更新
export const updateAppConfig = params => request.post(`${BASE_URL}/v1/service/updateAppConfig`, params)


// 我的应用会话列表
export const getMyAppDialog = params => request.post(`${BASE_URL}/v1/service/userAppDialogList`, params)
// .创建应用会话
export const createAppChat = params => request.post(`${BASE_URL}/v1/service/createAppDialog`, params)

// .编辑&删除应用会话
export const updateAppDialog = params => request.post(`${BASE_URL}/v1/service/updateAppDialog`, params)
