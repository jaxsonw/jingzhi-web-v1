"use client"

import React, { useRef } from 'react';
import { Anchor, Row, Col } from "antd";

const updateLogs = [
    {
        date: '2023年08月',
        childs: [
            {
                time: '2023-08-08',
                title: 'AI助理优化',
                commitList: [
                    {
                        content: '增加超时逻辑',
                    },
                    {
                        content: '增加超时重新生成功能',
                    },
                ],
            },
            {
                time: '2023-08-04',
                title: '修复一些bug',
                commitList: [
                    {
                        content: '修复应用编辑滚动问题',
                    },
                    {
                        content: '优化应用内容测试交互',
                    },
                ],
            },
        ],
    },
    {
        date: '2023年07月',
        childs: [
            {
                time: '2023-07-31',
                title: '增加360智脑',
                commitList: [
                    {
                        content: 'AI助理增加360智脑模型',
                    },
                    {
                        content: '绘图增加记录上报',
                    },
                ],
            },
            {
                time: '2023-07-26',
                title: '修复bug',
                commitList: [
                    {
                        content: '优化一些问答交互问题',
                    },
                    {
                        content: '二维码图片增加下载功能',
                    },
                ],
            },
            {
                time: '2023-07-24',
                title: '绘画新版上线',
                commitList: [
                    {
                        content: '绘画页面功能改版',
                    },
                    {
                        content: '增加AI学习文档入口',
                    },
                    {
                        content: '增加交流群二维码',
                    },
                ],
            },
            {
                time: '2023-07-20',
                title: '应用开放功能上线',
                commitList: [
                    {
                        content: '增加应用开放功能',
                    },
                    {
                        content: '增加订单空记录&客服功能入口',
                    },
                ],
            },
            {
                time: '2023-07-16',
                title: '限免活动结束',
                commitList: [
                    {
                        content: '增加全站应用水滴次数扣除',
                    },
                    {
                        content: '增加商店&开启支付功能',
                    },
                    {
                        content: '增加客服功能',
                    },
                ],
            },
            {
                time: '2023-07-14',
                title: '增加邀请功能',
                commitList: [
                    {
                        content: '邀请好友得无限次数全面上线',
                    },
                    {
                        content: '优化一些交互体验',
                    },
                ],
            },
            {
                time: '2023-07-08',
                title: '优化页面交互',
                commitList: [
                    {
                        content: '应用编辑功能调优',
                    },
                    {
                        content: '工作区UI改版',
                    },
                ],
            },
            {
                time: '2023-07-02',
                title: '版本升级',
                commitList: [
                    {
                        content: '增加智能聊天对话功能',
                    },
                    {
                        content: '增加MJ绘画功能',
                    },
                ],
            },
        ],
    },
    {
        date: '2023年06月',
        childs: [
            {
                time: '2023-06-28',
                title: '功能调优&BUG修复',
                commitList: [
                    {
                        content: '修复登录BUG',
                    },
                    {
                        content: '修复新建会话问题',
                    },
                    {
                        content: '增加邮箱订阅&增加应用导航',
                    },
                    {
                        content: '关于我们页面增加动画效果',
                    },
                ],
            },
            {
                time: '2023-06-23',
                title: '整体样式调优',
                commitList: [
                    {
                        content: '首页增加了使用者评论以及部分AI应用简介',
                    },
                    {
                        content: '首页进行了统一SEO处理',
                    },
                    {
                        content: '应用中心增加了动画效果及搜索功能',
                    },
                    {
                        content: '增加了关于我们页面',
                    },
                ],
            },
            {
                time: '2023-06-17',
                title: '移动端兼容',
                commitList: [
                    {
                        content: '文本对话型应用移动端支持',
                    },
                    {
                        content: '兼容首页及应用中心移动端样式',
                    },
                ],
            },
            {
                time: '2023-06-11',
                title: '版本升级',
                commitList: [
                    {
                        content: '知识库功能上线',
                    },
                    {
                        content: '创作者中心上线',
                    },
                    {
                        content: '工作区上线',
                    },
                ],
            },
            {
                time: '2023-06-04',
                title: '提升编辑体验',
                commitList: [
                    {
                        content: '改造文本应用编辑器',
                    },
                    {
                        content: '新增对话应用编辑功能',
                    },
                ],
            },
            {
                time: '2023-06-01',
                title: '更新了一些样式问题',
                commitList: [
                    {
                        content: '导航栏进行了升级改造',
                    },
                    {
                        content: '首页进行改版优化',
                    },
                    {
                        content: '增加了一些AI应用',
                    },
                ],
            },
        ],
    },
    {
        date: '2023年05月',
        childs: [
            {
                time: '2023-05-26',
                title: '我们上线内测啦～',
                commitList: [
                    {
                        content: '开放了200+AI应用',
                    },
                    {
                        content: '自定义文本应用编辑',
                    },
                    {
                        content: '简易版用户体系',
                    },
                ],
            },
        ],
    }, 
];

const generateMarkdown = (logs) => {
    return logs.map((log, index) => (
        <div key={"mdlog" + index} id={"log-" + index} className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{log.date}</h2>
            <div className='bg-purple-50 border rounded-md px-4 pt-4 border-blue-400 border-solid'>
                {log.childs.map((child, childIndex) => (
                    <div key={"logChild" + childIndex} id={"log-" + index + "-" + childIndex} className="pb-4">
                        <h3 className="text-lg font-semibold">{child.title}</h3>
                        <ul className="list-decimal list-inside">
                            {child.commitList.map((commit, commitIndex) => (
                                <li key={commitIndex}>{commit.content}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </div>
    ));
};

const ChangelogPage = () => {
    return (
        <div className='h-screen box-border pt-[70px]'>
            <Row className='h-full'>
                <Col span={4} className='text-[6px]'>
                    <Anchor
                        getContainer={() => document.getElementById("changeLogContainer")}
                        affix={true}
                        replace={true}
                        items={updateLogs.map((log, index) => {
                            return {
                                key: "logAnchor" + index,
                                href: '#log-' + index,
                                title: log.date,
                                // children: log.childs.map((child, childIndex) => {
                                //     return {
                                //         key: "logChildAnchor" + childIndex,
                                //         href: '#log-' + index + '-' + childIndex,
                                //         title: child.title,
                                //     }
                                // })
                            }
                        })}
                    />
                </Col>
                <Col
                    id="changeLogContainer"
                    className='h-full overflow-y-scroll flex-1'
                >
                    {generateMarkdown(updateLogs)}
                </Col>
            </Row>
        </div>

    );
};

export default ChangelogPage;