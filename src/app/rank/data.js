// 多领域评测数据
// 数据来源：平均分.xlsx、标注文档.docx、数据标注综合评估报告.docx

// 模型列表
export const MODELS = [
  { key: 'doubao', name: '豆包（V1.81.6）', provider: '字节跳动' },
  { key: 'yuanbao', name: '腾讯元宝（V2.42.0）', provider: '腾讯' },
  { key: 'zhipu', name: '智谱清言（GLM-4.5）', provider: '智谱AI' },
  { key: 'kimi', name: 'KIMI2.02.0', provider: 'Moonshot' },
  { key: 'hunyuan', name: '腾讯混元（V2.46.20）', provider: '腾讯' },
  { key: 'qianwen', name: '通义千问（Qwen3-Max-Preview）', provider: '阿里巴巴' },
  { key: 'wenxin', name: '文心一言（文心4.5Turbo）', provider: '百度' },
  { key: 'copilot', name: 'Copilot（Think Deeper）', provider: 'Microsoft' },
]

// 领域列表
export const DOMAINS = [
  { key: 'geography', name: '地理' },
  { key: 'law', name: '法律' },
  { key: 'education', name: '教育' },
  { key: 'finance', name: '金融' },
  { key: 'military', name: '军事' },
  { key: 'technology', name: '科技' },
  { key: 'history', name: '历史' },
  { key: 'travel', name: '旅游' },
  { key: 'sports', name: '体育' },
  { key: 'culture', name: '文化' },
  { key: 'medical', name: '医疗' },
  { key: 'food', name: '饮食' },
  { key: 'entertainment', name: '娱乐' },
  { key: 'politics', name: '政治' },
]

// 评测维度
export const METRICS = [
  { key: 'relevance', name: '相关性' },
  { key: 'boundary', name: '知识边界处理' },
  { key: 'completeness', name: '答案完整性' },
  { key: 'conciseness', name: '答案简洁性' },
]

// 非时效性评测数据 - 综合平均分（按总分排序）
export const NON_TIMELY_SCORES = [
  { model: 'Copilot（Think Deeper）', provider: 'Microsoft', total: 9.705, relevance: 2.986, boundary: 2.954, completeness: 1.931, conciseness: 1.834 },
  { model: '通义千问（Qwen3-Max-Preview）', provider: '阿里巴巴', total: 9.595, relevance: 2.992, boundary: 2.996, completeness: 1.984, conciseness: 1.622 },
  { model: '文心一言（文心4.5Turbo）', provider: '百度', total: 9.568, relevance: 2.983, boundary: 2.968, completeness: 1.834, conciseness: 1.783 },
  { model: 'KIMI2.02.0', provider: 'Moonshot', total: 9.466, relevance: 2.906, boundary: 2.932, completeness: 1.763, conciseness: 1.866 },
  { model: '豆包（V1.81.6）', provider: '字节跳动', total: 9.461, relevance: 2.995, boundary: 2.997, completeness: 1.921, conciseness: 1.548 },
  { model: '腾讯混元（V2.46.20）', provider: '腾讯', total: 9.388, relevance: 2.919, boundary: 2.889, completeness: 1.827, conciseness: 1.753 },
  { model: '腾讯元宝（V2.42.0）', provider: '腾讯', total: 9.365, relevance: 2.896, boundary: 2.805, completeness: 1.690, conciseness: 1.975 },
  { model: '智谱清言（GLM-4.5）', provider: '智谱AI', total: 9.291, relevance: 2.914, boundary: 2.820, completeness: 1.569, conciseness: 1.989 },
]

// 时效性评测数据 - 综合平均分
export const TIMELY_SCORES = [
  { model: 'Copilot（Think Deeper）', provider: 'Microsoft', total: 8.697, relevance: 2.841, boundary: 2.441, completeness: 1.821, conciseness: 1.594 },
  { model: '智谱清言（GLM-4.5）', provider: '智谱AI', total: 8.420, relevance: 2.850, boundary: 2.229, completeness: 1.417, conciseness: 1.925 },
  { model: '豆包（V1.81.6）', provider: '字节跳动', total: 7.481, relevance: 2.450, boundary: 2.166, completeness: 1.459, conciseness: 1.407 },
  { model: '腾讯元宝（V2.42.0）', provider: '腾讯', total: 6.823, relevance: 2.259, boundary: 1.941, completeness: 1.074, conciseness: 1.549 },
  { model: '文心一言（文心4.5Turbo）', provider: '百度', total: 6.499, relevance: 2.136, boundary: 1.874, completeness: 1.086, conciseness: 1.403 },
  { model: '腾讯混元（V2.46.20）', provider: '腾讯', total: 6.427, relevance: 1.996, boundary: 1.781, completeness: 1.192, conciseness: 1.457 },
  { model: '通义千问（Qwen3-Max-Preview）', provider: '阿里巴巴', total: 5.338, relevance: 1.641, boundary: 1.526, completeness: 0.897, conciseness: 1.273 },
  { model: 'KIMI2.0', provider: 'Moonshot', total: 4.833, relevance: 1.602, boundary: 1.565, completeness: 0.676, conciseness: 0.991 },
]

// 非时效性 - 各领域详细数据（四项指标总和）
export const NON_TIMELY_BY_DOMAIN = {
  geography: [
    { model: '豆包（V1.81.6）', score: 9.142 },       // 3 + 2.9996 + 2 + 1.1429
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.001 },   // 3 + 3 + 2 + 1.0007
    { model: 'Copilot（Think Deeper）', score: 9.037 },    // 3 + 2.5689 + 1.9968 + 1.4718
    { model: '腾讯元宝（V2.42.0）', score: 8.819 },   // 3 + 1.9286 + 1.89 + 2
    { model: 'KIMI2.0', score: 8.039 },       // 3 + 2.9014 + 2 + 1.1375
    { model: '文心一言（文心4.5Turbo）', score: 8.001 },   // 3 + 2.8225 + 1.99 + 1.1886
    { model: '智谱清言（GLM-4.5）', score: 8.718 },   // 3 + 1.9286 + 1.7896 + 2
    { model: '腾讯混元（V2.46.20）', score: 8.591 },   // 3 + 2.4211 + 1.62 + 1.5496
  ],
  law: [
    { model: '文心一言（文心4.5Turbo）', score: 9.011 },   // 3 + 3 + 2 + 1.0107
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.000 },   // 3 + 3 + 2 + 1
    { model: 'Copilot（Think Deeper）', score: 9.704 },    // 3 + 3 + 1.9907 + 1.7136
    { model: '腾讯混元（V2.46.20）', score: 9.351 },   // 3 + 2.8114 + 1.7746 + 1.7646
    { model: 'KIMI2.0', score: 8.623 },       // 3 + 2.8418 + 0.9996 + 1.7814
    { model: '豆包（V1.81.6）', score: 8.146 },       // 3 + 3 + 1 + 1.1464
    { model: '智谱清言（GLM-4.5）', score: 8.039 },   // 3 + 2.1736 + 0.8689 + 1.9968
    { model: '腾讯元宝（V2.42.0）', score: 8.055 },   // 2.9979 + 2.0571 + 1 + 2
  ],
  education: [
    { model: '豆包（V1.81.6）', score: 9.824 },       // 2.9629 + 2.9814 + 1.9511 + 1.9286
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.804 },   // 2.9779 + 2.9854 + 1.9639 + 1.8764
    { model: '文心一言（文心4.5Turbo）', score: 9.779 },   // 2.9993 + 2.9996 + 1.975 + 1.8046
    { model: 'Copilot（Think Deeper）', score: 9.673 },    // 2.9707 + 2.9996 + 1.7039 + 1.9989
    { model: '腾讯混元（V2.46.20）', score: 9.531 },   // 2.99 + 2.9964 + 1.5514 + 1.9929
    { model: '智谱清言（GLM-4.5）', score: 9.058 },   // 2.995 + 2.9993 + 1.0632 + 2.0004
    { model: 'KIMI2.0', score: 6.903 },       // 1.8464 + 2.4221 + 0.6346 + 2
    { model: '腾讯元宝（V2.42.0）', score: 6.724 },   // 1.7586 + 2.3875 + 0.5782 + 2
  ],
  finance: [
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.974 },   // 3 + 3 + 1.9975 + 1.9764
    { model: '腾讯混元（V2.46.20）', score: 9.824 },   // 2.9907 + 2.9954 + 1.8382 + 2
    { model: '豆包（V1.81.6）', score: 9.843 },       // 3 + 3 + 1.9875 + 1.8557
    { model: '文心一言（文心4.5Turbo）', score: 9.784 },   // 3 + 3 + 1.9864 + 1.7979
    { model: 'Copilot（Think Deeper）', score: 9.766 },    // 3 + 3 + 1.7679 + 1.9986
    { model: '智谱清言（GLM-4.5）', score: 9.503 },   // 2.9996 + 3 + 1.5307 + 1.9725
    { model: 'KIMI2.0', score: 9.509 },       // 2.9975 + 2.9789 + 1.54 + 1.9925
    { model: '腾讯元宝（V2.42.0）', score: 9.360 },   // 3 + 3 + 1.3596 + 2
  ],
  military: [
    { model: '腾讯元宝（V2.42.0）', score: 9.960 },   // 2.9849 + 2.9996 + 1.9752 + 2
    { model: '智谱清言（GLM-4.5）', score: 9.947 },   // 2.9824 + 2.9996 + 1.9652 + 2
    { model: '文心一言（文心4.5Turbo）', score: 9.931 },   // 2.9878 + 2.9996 + 1.9853 + 1.9584
    { model: 'KIMI2.0', score: 9.888 },       // 2.9702 + 2.9996 + 1.9182 + 1.9993
    { model: 'Copilot（Think Deeper）', score: 9.860 },    // 2.953 + 2.9996 + 1.9293 + 1.9781
    { model: '豆包（V1.81.6）', score: 9.777 },       // 2.9889 + 2.9996 + 1.9935 + 1.7947
    { model: '腾讯混元（V2.46.20）', score: 9.729 },   // 2.944 + 2.9996 + 1.9056 + 1.8798
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.549 },   // 2.9813 + 2.9996 + 1.9777 + 1.5908
  ],
  technology: [
    { model: 'KIMI2.0', score: 9.637 },       // 2.995 + 2.9993 + 1.7468 + 1.8968
    { model: '智谱清言（GLM-4.5）', score: 9.457 },   // 2.9875 + 3 + 1.5482 + 1.9086
    { model: '腾讯元宝（V2.42.0）', score: 9.394 },   // 2.9439 + 2.9554 + 1.5731 + 1.9214
    { model: 'Copilot（Think Deeper）', score: 9.333 },    // 2.9979 + 2.9989 + 1.8914 + 1.4454
    { model: '文心一言（文心4.5Turbo）', score: 9.272 },   // 2.9986 + 2.9996 + 1.9964 + 1.2779
    { model: '豆包（V1.81.6）', score: 9.092 },       // 2.9993 + 3 + 1.9996 + 1.0932
    { model: '通义千问（Qwen3-Max-Preview）', score: 8.996 },   // 2.9996 + 3 + 1.9943 + 1.0018
    { model: '腾讯混元（V2.46.20）', score: 8.490 },   // 2.7448 + 2.8371 + 1.7918 + 1.1161
  ],
  history: [
    { model: 'KIMI2.0', score: 9.566 },       // 2.9943 + 2.9979 + 1.9379 + 1.6364
    { model: '智谱清言（GLM-4.5）', score: 9.547 },   // 2.9986 + 3 + 1.5704 + 1.9782
    { model: '腾讯元宝（V2.42.0）', score: 9.457 },   // 2.9232 + 3 + 1.7775 + 1.7564
    { model: 'Copilot（Think Deeper）', score: 9.414 },    // 3 + 2.86 + 1.9721 + 1.5821
    { model: '豆包（V1.81.6）', score: 9.224 },       // 2.9989 + 2.9989 + 1.9989 + 1.2268
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.082 },   // 2.9979 + 2.9989 + 1.9961 + 1.0889
    { model: '腾讯混元（V2.46.20）', score: 9.078 },   // 2.9461 + 2.8932 + 1.83 + 1.4086
    { model: '文心一言（文心4.5Turbo）', score: 9.360 },   // 2.9975 + 3 + 1.3629 + 2
  ],
  travel: [
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.996 },   // 2.9986 + 2.9989 + 1.9986 + 2
    { model: 'Copilot（Think Deeper）', score: 9.988 },    // 2.9979 + 2.9979 + 1.9982 + 1.9943
    { model: '腾讯元宝（V2.42.0）', score: 9.982 },   // 2.9932 + 2.9936 + 1.9954 + 2
    { model: 'KIMI2.0', score: 9.981 },       // 2.9961 + 2.9964 + 1.9964 + 1.9921
    { model: '豆包（V1.81.6）', score: 9.930 },       // 2.9968 + 2.9979 + 1.9975 + 1.9375
    { model: '腾讯混元（V2.46.20）', score: 9.826 },   // 2.9411 + 2.9782 + 1.9346 + 1.9718
    { model: '智谱清言（GLM-4.5）', score: 9.720 },   // 2.9979 + 2.9979 + 1.7239 + 2
    { model: '文心一言（文心4.5Turbo）', score: 8.140 },   // 2.9975 + 2.9979 + 1.1454 + 2
  ],
  sports: [
    { model: '腾讯元宝（V2.42.0）', score: 9.921 },   // 2.9838 + 2.977 + 1.9691 + 1.9903
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.900 },   // 2.9978 + 2.9907 + 1.987 + 1.9245
    { model: 'Copilot（Think Deeper）', score: 9.900 },    // 2.9939 + 2.9885 + 1.9835 + 1.9335
    { model: 'KIMI2.0', score: 9.778 },       // 2.9694 + 2.9461 + 1.9526 + 1.9097
    { model: '豆包（V1.81.6）', score: 9.766 },       // 2.9986 + 2.9946 + 1.9921 + 1.7803
    { model: '智谱清言（GLM-4.5）', score: 9.693 },   // 2.881 + 2.9141 + 1.8972 + 2
    { model: '文心一言（文心4.5Turbo）', score: 9.340 },   // 2.8422 + 2.789 + 1.7865 + 1.9213
    { model: '腾讯混元（V2.46.20）', score: 9.299 },   // 2.9202 + 2.9091 + 1.9432 + 1.5266
  ],
  culture: [
    { model: 'Copilot（Think Deeper）', score: 10.000 },   // 3 + 3 + 2 + 1.9996
    { model: 'KIMI2.0', score: 9.995 },       // 2.9986 + 3 + 1.9975 + 1.9996
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.998 },   // 2.9989 + 2.9989 + 1.9986 + 2
    { model: '豆包（V1.81.6）', score: 9.762 },       // 3 + 3 + 2 + 1.7618
    { model: '腾讯混元（V2.46.20）', score: 9.620 },   // 2.8854 + 2.9611 + 1.8904 + 1.8832
    { model: '腾讯元宝（V2.42.0）', score: 9.575 },   // 3 + 3 + 1.5811 + 1.9939
    { model: '文心一言（文心4.5Turbo）', score: 9.567 },   // 3 + 3 + 1.5668 + 2
    { model: '智谱清言（GLM-4.5）', score: 9.130 },   // 2.9989 + 2.9989 + 1.1318 + 2
  ],
  medical: [
    { model: 'KIMI2.0', score: 9.994 },       // 3 + 2.9971 + 1.9986 + 1.9979
    { model: '腾讯元宝（V2.42.0）', score: 9.991 },   // 2.9971 + 2.9982 + 1.9957 + 1.9996
    { model: '文心一言（文心4.5Turbo）', score: 9.990 },   // 2.9989 + 2.9982 + 1.9925 + 2
    { model: 'Copilot（Think Deeper）', score: 9.932 },    // 2.9635 + 2.9996 + 1.9971 + 1.9721
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.907 },   // 2.9754 + 2.9996 + 1.9989 + 1.9332
    { model: '豆包（V1.81.6）', score: 9.698 },       // 3 + 3 + 2 + 1.6979
    { model: '腾讯混元（V2.46.20）', score: 9.093 },   // 2.7296 + 2.6811 + 1.7332 + 1.9489
    { model: '智谱清言（GLM-4.5）', score: 7.426 },   // 1.9989 + 2.4993 + 0.9275 + 2
  ],
  food: [
    { model: '文心一言（文心4.5Turbo）', score: 9.986 },   // 2.9982 + 2.9971 + 1.9907 + 1.9996
    { model: '腾讯元宝（V2.42.0）', score: 9.977 },   // 2.9986 + 2.9928 + 1.9893 + 1.9968
    { model: '智谱清言（GLM-4.5）', score: 9.917 },   // 2.9767 + 2.9749 + 1.967 + 1.9986
    { model: 'KIMI2.0', score: 9.779 },       // 2.9936 + 2.9928 + 1.9903 + 1.8026
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.747 },   // 2.9993 + 2.9975 + 1.991 + 1.7589
    { model: 'Copilot（Think Deeper）', score: 9.569 },    // 2.9871 + 2.991 + 1.9817 + 1.6084
    { model: '腾讯混元（V2.46.20）', score: 9.532 },   // 2.9903 + 2.9893 + 1.9803 + 1.5726
    { model: '豆包（V1.81.6）', score: 9.204 },       // 3 + 3 + 1.9971 + 1.2071
  ],
  entertainment: [
    { model: '智谱清言（GLM-4.5）', score: 9.971 },   // 2.9838 + 2.991 + 1.9964 + 2
    { model: '腾讯元宝（V2.42.0）', score: 9.966 },   // 2.9806 + 2.9914 + 1.9939 + 2
    { model: '文心一言（文心4.5Turbo）', score: 9.914 },   // 2.9842 + 2.9939 + 1.9368 + 1.9993
    { model: 'KIMI2.0', score: 9.872 },       // 2.9318 + 2.9846 + 1.9727 + 1.9835
    { model: '豆包（V1.81.6）', score: 9.829 },       // 2.9831 + 2.9925 + 1.9795 + 1.8743
    { model: 'Copilot（Think Deeper）', score: 9.820 },    // 2.9968 + 2.9878 + 1.8503 + 1.9856
    { model: '腾讯混元（V2.46.20）', score: 9.675 },   // 2.8359 + 2.9957 + 1.86 + 1.9831
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.647 },   // 2.9666 + 2.9932 + 1.8901 + 1.7968
  ],
  politics: [
    { model: '智谱清言（GLM-4.5）', score: 9.968 },   // 2.9914 + 2.9996 + 1.981 + 1.9957
    { model: 'KIMI2.0', score: 9.963 },       // 2.9857 + 2.9871 + 1.9911 + 1.9986
    { model: '腾讯元宝（V2.42.0）', score: 9.937 },   // 2.9789 + 2.9832 + 1.9886 + 1.986
    { model: '文心一言（文心4.5Turbo）', score: 9.879 },   // 2.9628 + 2.9546 + 1.9642 + 1.9971
    { model: 'Copilot（Think Deeper）', score: 9.874 },    // 2.9488 + 2.9585 + 1.9685 + 1.9982
    { model: '腾讯混元（V2.46.20）', score: 9.796 },   // 2.9528 + 2.9757 + 1.9181 + 1.9492
    { model: '通义千问（Qwen3-Max-Preview）', score: 9.735 },   // 2.9961 + 2.9843 + 1.9889 + 1.766
    { model: '豆包（V1.81.6）', score: 9.223 },       // 3 + 2.9989 + 1.9993 + 1.225
  ],
}

// 时效性 - 各领域详细数据（四项指标总和）
export const TIMELY_BY_DOMAIN = {
  geography: [
    { model: '腾讯混元（V2.46.20）', score: 8.996 },   // 2.9962 + 2 + 2 + 2
    { model: '智谱清言（GLM-4.5）', score: 7.998 },   // 2.9987 + 2.9975 + 2 + 1.0013
    { model: '腾讯元宝（V2.42.0）', score: 9.250 },   // 2.903 + 2.9647 + 1.3846 + 1.9975
    { model: 'Copilot（Think Deeper）', score: 7.000 },    // 2 + 2 + 1 + 2
    { model: 'KIMI2.0', score: 6.670 },       // 2.6709 + 2 + 1.9987 + 1
    { model: '豆包（V1.81.6）', score: 6.067 },       // 2.1904 + 1.8651 + 1.0038 + 1.0076
    { model: '文心一言（文心4.5Turbo）', score: 5.806 },   // 1.9458 + 1.9206 + 1.7869 + 1.1526
    { model: '通义千问（Qwen3-Max-Preview）', score: 5.523 },   // 1.4767 + 1.4754 + 1.4754 + 1.0958
  ],
  law: [
    { model: '豆包（V1.81.6）', score: 10.000 },      // 3 + 3 + 2 + 2
    { model: 'Copilot（Think Deeper）', score: 8.337 },    // 2.6684 + 2 + 2 + 1.6684
    { model: '智谱清言（GLM-4.5）', score: 8.999 },   // 2.9987 + 2 + 2 + 2
    { model: '腾讯混元（V2.46.20）', score: 7.485 },   // 2.3559 + 1.8457 + 1.5625 + 1.2835
    { model: '通义千问（Qwen3-Max-Preview）', score: 7.433 },   // 2.0957 + 2.0944 + 1.9757 + 1.2669
    { model: '文心一言（文心4.5Turbo）', score: 6.738 },   // 2.1903 + 1.765 + 1.7101 + 1.0728
    { model: '腾讯元宝（V2.42.0）', score: 6.218 },   // 2.1684 + 1.4758 + 0.8712 + 1.7024
    { model: 'KIMI2.0', score: 4.872 },       // 1.8724 + 1 + 1 + 1
  ],
  education: [
    { model: 'Copilot（Think Deeper）', score: 10.000 },   // 3 + 3 + 2 + 2
    { model: '智谱清言（GLM-4.5）', score: 9.253 },   // 3 + 2.257 + 2 + 1.9963
    { model: '豆包（V1.81.6）', score: 8.780 },       // 2.7772 + 2.2411 + 1.9474 + 1.8144
    { model: '腾讯混元（V2.46.20）', score: 8.149 },   // 2.1493 + 2 + 2 + 2
    { model: '腾讯元宝（V2.42.0）', score: 7.792 },   // 2.4847 + 1.6867 + 1.8201 + 1.801
    { model: '文心一言（文心4.5Turbo）', score: 7.171 },   // 2.0588 + 2.0563 + 2 + 1.0563
    { model: '通义千问（Qwen3-Max-Preview）', score: 7.000 },   // 2 + 2 + 2 + 1
    { model: 'KIMI2.0', score: 6.005 },       // 2.0012 + 2.0012 + 1.0012 + 1.0012
  ],
  finance: [
    { model: 'Copilot（Think Deeper）', score: 10.000 },   // 3 + 3 + 2 + 2
    { model: '智谱清言（GLM-4.5）', score: 8.265 },   // 2.2734 + 1.9976 + 1.9976 + 1.9964
    { model: '豆包（V1.81.6）', score: 7.811 },       // 1.8639 + 2.4391 + 1.8414 + 1.6663
    { model: '腾讯混元（V2.46.20）', score: 7.315 },   // 2.3148 + 2 + 2 + 1
    { model: '通义千问（Qwen3-Max-Preview）', score: 7.000 },   // 2 + 2 + 1 + 2
    { model: '文心一言（文心4.5Turbo）', score: 6.847 },   // 2.1621 + 2.0592 + 1.5124 + 1.1136
    { model: '腾讯元宝（V2.42.0）', score: 6.343 },   // 1.8189 + 1.705 + 1.7773 + 1.0427
    { model: 'KIMI2.0', score: 5.414 },       // 1.5148 + 1.5207 + 1.374 + 1.0047
  ],
  military: [
    { model: '腾讯混元（V2.46.20）', score: 10.000 },  // 3 + 3 + 2 + 2
    { model: 'Copilot（Think Deeper）', score: 9.673 },    // 2.8911 + 2.8911 + 1.8911 + 2
    { model: '豆包（V1.81.6）', score: 8.803 },       // 2.646 + 2.646 + 1.7547 + 1.756
    { model: '智谱清言（GLM-4.5）', score: 7.833 },   // 2.9442 + 1.9454 + 0.943 + 2
    { model: '腾讯元宝（V2.42.0）', score: 7.621 },   // 2.8392 + 2.8405 + 0.9405 + 1.0013
    { model: '文心一言（文心4.5Turbo）', score: 6.000 },   // 1.7228 + 1.7215 + 1.2772 + 1.2785
    { model: 'KIMI2.0', score: 5.139 },       // 2.0278 + 1.0557 + 1.0278 + 1.0278
    { model: '通义千问（Qwen3-Max-Preview）', score: 4.396 },   // 1.0354 + 1.0354 + 1.0177 + 1.3076
  ],
  technology: [
    { model: 'Copilot（Think Deeper）', score: 10.000 },   // 3 + 3 + 2 + 2
    { model: '腾讯混元（V2.46.20）', score: 8.696 },   // 2.9773 + 2.3632 + 1.3632 + 1.9924
    { model: '豆包（V1.81.6）', score: 8.473 },       // 2.6141 + 2.6154 + 1.6204 + 1.623
    { model: '智谱清言（GLM-4.5）', score: 8.267 },   // 2.9735 + 2.3077 + 0.9899 + 1.9962
    { model: '腾讯元宝（V2.42.0）', score: 7.809 },   // 2.5259 + 2.5208 + 0.7629 + 2
    { model: 'KIMI2.0', score: 4.974 },       // 1.1236 + 1.7453 + 0.7339 + 1.3707
    { model: '文心一言（文心4.5Turbo）', score: 4.469 },   // 1.1425 + 1.6204 + 0.174 + 1.5322
    { model: '通义千问（Qwen3-Max-Preview）', score: 2.000 },   // 0 + 1 + 0 + 1
  ],
  history: [
    { model: '腾讯混元（V2.46.20）', score: 9.990 },   // 3 + 3 + 2 + 1.9899
    { model: '智谱清言（GLM-4.5）', score: 9.890 },   // 2.9924 + 2.9924 + 1.9127 + 1.9924
    { model: 'Copilot（Think Deeper）', score: 9.851 },    // 3 + 3 + 2 + 1.8508
    { model: '腾讯元宝（V2.42.0）', score: 8.795 },   // 2.4835 + 2.6557 + 1.6557 + 2
    { model: '文心一言（文心4.5Turbo）', score: 7.791 },   // 2.2933 + 2.4298 + 1.287 + 1.7813
    { model: '豆包（V1.81.6）', score: 7.716 },       // 2.2253 + 2.5013 + 1.2861 + 1.7038
    { model: '通义千问（Qwen3-Max-Preview）', score: 5.199 },   // 1.1861 + 1.6696 + 0.343 + 2
    { model: 'KIMI2.0', score: 5.000 },       // 2 + 2 + 0 + 1
  ],
  travel: [
    { model: '智谱清言（GLM-4.5）', score: 10.000 },  // 3 + 3 + 2 + 2
    { model: '腾讯元宝（V2.42.0）', score: 8.554 },   // 2.5364 + 2.5364 + 1.4809 + 2
    { model: '豆包（V1.81.6）', score: 7.729 },       // 2.6473 + 2.4599 + 1.0333 + 1.5882
    { model: '文心一言（文心4.5Turbo）', score: 7.121 },   // 2.2207 + 2.2885 + 0.6116 + 2
    { model: 'Copilot（Think Deeper）', score: 7.109 },    // 2.2207 + 2.2885 + 0.6116 + 2
    { model: 'KIMI2.0', score: 6.082 },       // 2.0814 + 2.0814 + 0.0012 + 1.9186
    { model: '通义千问（Qwen3-Max-Preview）', score: 5.008 },   // 1.5006 + 1.5068 + 0 + 2
    { model: '腾讯混元（V2.46.20）', score: 3.425 },   // 0.2133 + 1.2121 + 0 + 2
  ],
  sports: [
    { model: 'Copilot（Think Deeper）', score: 9.800 },    // 3 + 3 + 2 + 1.8
    { model: '豆包（V1.81.6）', score: 8.282 },       // 2.53 + 2.5325 + 1.2196 + 2
    { model: '智谱清言（GLM-4.5）', score: 7.686 },   // 2.7472 + 1.9387 + 1 + 2
    { model: '腾讯元宝（V2.42.0）', score: 7.250 },   // 2.1534 + 2.3607 + 0.7411 + 1.9951
    { model: '文心一言（文心4.5Turbo）', score: 6.950 },   // 2.7742 + 2.0577 + 0.1178 + 2
    { model: '通义千问（Qwen3-Max-Preview）', score: 6.634 },   // 2.7571 + 1.8908 + 0.0356 + 1.9509
    { model: 'KIMI2.0', score: 6.253 },       // 2.2528 + 2 + 0 + 2
    { model: '腾讯混元（V2.46.20）', score: 4.000 },   // 1 + 1 + 0 + 2
  ],
  culture: [
    { model: 'Copilot（Think Deeper）', score: 8.000 },    // 3 + 2 + 2 + 1
    { model: '智谱清言（GLM-4.5）', score: 6.797 },   // 2 + 1.797 + 1 + 2
    { model: '文心一言（文心4.5Turbo）', score: 5.273 },   // 1.9825 + 1.3108 + 0.9624 + 1.0175
    { model: '豆包（V1.81.6）', score: 4.944 },       // 1.817 + 1.312 + 1.0526 + 0.7619
    { model: '通义千问（Qwen3-Max-Preview）', score: 4.522 },   // 1.7576 + 1.0114 + 0.8788 + 0.875
    { model: '腾讯元宝（V2.42.0）', score: 3.249 },   // 1.2143 + 0.7932 + 0.4148 + 0.8271
    { model: '腾讯混元（V2.46.20）', score: 1.006 },   // 0.0025 + 1 + 0.0025 + 0.0013
    { model: 'KIMI2.0', score: 1.000 },       // 0 + 1 + 0 + 0
  ],
  medical: [
    { model: 'KIMI2.0', score: 8.000 },       // 3 + 2 + 1.2621 + 1.7379
    { model: 'Copilot（Think Deeper）', score: 8.000 },    // 3 + 2 + 2 + 1
    { model: '智谱清言（GLM-4.5）', score: 8.000 },   // 3 + 2 + 1 + 2
    { model: '文心一言（文心4.5Turbo）', score: 7.990 },   // 2.9962 + 1.9974 + 0.9987 + 1.9974
    { model: '豆包（V1.81.6）', score: 7.363 },       // 2.7877 + 1.7877 + 1.7289 + 1.0588
    { model: '通义千问（Qwen3-Max-Preview）', score: 6.205 },   // 2.2583 + 1.688 + 1.4731 + 0.7852
    { model: '腾讯混元（V2.46.20）', score: 4.411 },   // 1.4616 + 1.4872 + 0.9271 + 0.5345
    { model: '腾讯元宝（V2.42.0）', score: 4.031 },   // 1.5506 + 0.9296 + 0.7503 + 0.8003
  ],
  food: [
    { model: '腾讯混元（V2.46.20）', score: 8.000 },   // 3 + 2 + 1.119 + 1.881
    { model: '智谱清言（GLM-4.5）', score: 7.991 },   // 2.9962 + 1.9987 + 0.9987 + 1.9975
    { model: 'Copilot（Think Deeper）', score: 8.000 },    // 3 + 2 + 2 + 1
    { model: '文心一言（文心4.5Turbo）', score: 7.538 },   // 2.8025 + 1.9329 + 1.0215 + 1.781
    { model: '腾讯元宝（V2.42.0）', score: 7.442 },   // 2.7608 + 1.9203 + 1.0379 + 1.7228
    { model: '豆包（V1.81.6）', score: 5.797 },       // 2.0924 + 1.6127 + 1.2759 + 0.8165
    { model: '通义千问（Qwen3-Max-Preview）', score: 5.102 },   // 1.7582 + 1.5861 + 0.6544 + 1.104
    { model: 'KIMI2.0', score: 4.465 },       // 1.4848 + 1.495 + 0.8684 + 0.6165
  ],
  entertainment: [
    { model: 'Copilot（Think Deeper）', score: 8.000 },    // 3 + 2 + 2 + 1
    { model: '智谱清言（GLM-4.5）', score: 8.000 },   // 3 + 2 + 1 + 2
    { model: '豆包（V1.81.6）', score: 6.691 },       // 2.4943 + 1.7022 + 1.5982 + 0.8961
    { model: '腾讯元宝（V2.42.0）', score: 6.134 },   // 2.3004 + 1.5336 + 0.7668 + 1.5336
    { model: '文心一言（文心4.5Turbo）', score: 6.016 },   // 2.2028 + 1.6109 + 1.2801 + 0.9227
    { model: '腾讯混元（V2.46.20）', score: 5.050 },   // 2.0253 + 1.0253 + 1 + 1
    { model: '通义千问（Qwen3-Max-Preview）', score: 3.799 },   // 1.3942 + 1.0101 + 0.7022 + 0.6920
    { model: 'KIMI2.0', score: 1.788 },       // 0.3921 + 1.0038 + 0.198 + 0.1942
  ],
  politics: [
    { model: 'Copilot（Think Deeper）', score: 7.983 },    // 2.9927 + 1.9976 + 1.9951 + 0.9976
    { model: '智谱清言（GLM-4.5）', score: 7.908 },   // 2.9695 + 1.9695 + 1 + 1.9695
    { model: '豆包（V1.81.6）', score: 6.282 },       // 2.6093 + 1.6105 + 1.0623 + 1
    { model: '腾讯元宝（V2.42.0）', score: 5.032 },   // 1.8901 + 1.2576 + 0.6288 + 1.2564
    { model: '通义千问（Qwen3-Max-Preview）', score: 4.909 },   // 1.7582 + 1.3932 + 1.0085 + 0.7497
    { model: '腾讯混元（V2.46.20）', score: 3.888 },   // 1.442 + 1.0037 + 0.7204 + 0.7216
    { model: '文心一言（文心4.5Turbo）', score: 4.273 },   // 1.4029 + 1.4676 + 0.4676 + 0.9353
    { model: 'KIMI2.0', score: 1.000 },       // 0 + 1 + 0 + 0
  ],
}
