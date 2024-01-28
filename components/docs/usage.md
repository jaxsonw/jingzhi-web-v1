## 接口简介

该聚合接口用于进行对话生成。用户可以通过传递不同参数来调整模型生成的行为，包括选择模型、设置消息列表、控制生成长度、调整重复度等。接口支持以流形式返回结果，并提供联网搜索选项。

## 接口路径

``` js

https://api.ioii.cn/v1/agicto/chat

```

### 参数说明

- **model**：选择要使用的语言模型。
- **messages**：定义对话的消息列表，每个消息包含角色（user、assistant、system）和内容。
- **max_tokens**：限制生成文本的最大token数。
- **presence_penalty**：控制生成文本中的重复度，值越高表示重复度越低。
- **stream**：设置为true时，以流形式返回结果；设置为false时，返回完整的生成文本。
- **temperature**：调整生成文本的多样性，值越高生成越随机。
- **top_p**：Top-p采样参数，控制生成文本的多样性。
- **top_k**：Top-k采样参数，限制模型在每步选择时考虑的token范围。
- **enable_search**：设置为true时，允许模型进行联网搜索以获得更全面的信息。(**联网功能仅支持「百川」、「通义千问」模型**)

 
## 示例

```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Tell me a joke."},
    {"role": "assistant", "content": "Why did the chicken cross the road?"}
  ],
  "max_tokens": 50,
  "presence_penalty": 0.5,
  "stream": false,
  "temperature": 0.7,
  "top_p": 1.0,
  "top_k": 50,
  "enable_search": true
}
```



## 注意事项

- 请确保正确填写参数，以获得符合预期的生成文本。
- 适度调整**temperature**、**top_p**和**top_k**以满足具体需求。
- 联网搜索可能会增加生成时间，确保网络连接正常。