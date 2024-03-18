import request from '../utils/request';
import { BASE_URL } from "../consts/env";

/**
 * 获取登录信息
 * https://文档链接 https://api.devcto.com/v1/service/lesson/lessonList

 */

// /v1/service/chatgpt/chatHistory
// 参数
// lastMsgId
// page 分页数

export const getRecords = async payload => request.post(`${BASE_URL}/v1/service/chatgpt/chatHistory`, payload);

// /v1/service/recordMsg
// 参数
//  message 内容
//  type 1问题 2答案


export const saveQuestion = async message => request.post(`${BASE_URL}/v1/service/recordMsg`, {type: 1, message});

export const saveAnswer = async message => request.post(`${BASE_URL}/v1/service/recordMsg`, {type: 2, message});
