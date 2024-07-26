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
    }
];

const generateMarkdown = (logs) => {
    return logs.map((log, index) => (
        <div key={"mdlog" + index} id={"log-" + index} className="mb-4 bg-gray-100 px-4 py-2 rounded-lg">
            <title>更新日志</title>
            <h2 className="text-xl font-bold mb-2">{log.date}</h2>
            <div className='px-4'>
                {log.childs.map((child, childIndex) => (
                    <div key={"logChild" + childIndex} id={"log-" + index + "-" + childIndex} className="pb-4 hover:bg-gray-200 rounded-lg p-2">
                        <div className='flex justify-between'>
                            <h3 className="text-[16px] font-semibold">{child.title}</h3>
                            <span className='text-gray-400'>{child.time}</span>
                        </div>
                        <ul className="list-decimal list-inside pl-4">
                            {child.commitList.map((commit, commitIndex) => (
                                <li key={commitIndex} className='mt-2 flex items-center'>
                                    <span className='rounded-full h-2 w-2 bg-green-400 mr-2' />
                                    <span className='text-gray-500'>{commit.content}</span>
                                </li>
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
                    className='h-full overflow-y-scroll flex-1 pr-[20%] pt-4'
                >
                    {generateMarkdown(updateLogs)}
                </Col>
            </Row>
        </div>

    );
};

export default ChangelogPage;