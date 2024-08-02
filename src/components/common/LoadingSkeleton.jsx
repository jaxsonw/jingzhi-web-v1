import { Col, Row } from 'antd'

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
                <div className="flex">
                    <div className="h-[20px] w-[100px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[20px] bg-slate-300 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                </div>
                <div className="flex">
                    <div className="h-[20px] w-[100px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[20px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[70px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                </div>
                <div className="flex">
                    <div className="h-[20px] w-[100px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[20px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[70px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[80px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                    <div className="h-[20px] w-[100px] ml-[10px] bg-slate-200 rounded"></div>
                </div>
                <Row gutter={[16, 16]}>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} md={12} xs={24}>
                        <div
                            className="group shadow-xs cursor-pointer shadow-indigo-500/40 p-[20px]  bg-slate-300/50% rounded-[12px] ">
                            <h4 className="text-[#140E35] text-[20px] pb-[8px]">
                                <div className="h-[20px] bg-slate-200 rounded"></div>
                            </h4>
                            <div className="flex items-center pb-[18px]">
                                <span className="block p-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                                <span
                                    className="block p-[5px] ml-[5px] bg-[#F3F3F3] text-[12px] rounded-[2px]">
                                    <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                                </span>
                            </div>
                            <div className="flex items-center divide-y pb-[18px]">
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center pt-[10px]">
                                <div className="h-[30px] w-[30px]  bg-slate-200 rounded-full"></div>
                                <div className="h-[20px] w-[200px] bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}