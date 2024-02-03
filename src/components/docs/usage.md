<!-- ## 接口简介

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
- 联网搜索可能会增加生成时间，确保网络连接正常。 -->

export const metadata = {
title: 'Quickstart',
description:
'This guide will get you all set up and ready to use the Protocol API. We’ll cover how to get started an API client and how to make your first API request.',
}
import

# Quickstart

This guide will get you all set up and ready to use the Protocol API. We'll cover how to get started using one of our API clients and how to make your first API request. We'll also look at where to go next to find all the information you need to take full advantage of our powerful REST API. {{ className: 'lead' }}

<Note>
  Before you can make requests to the Protocol API, you will need to grab your
  API key from your dashboard. You find it under [Settings &raquo; API](#).
</Note>

## Choose your client

Before making your first API request, you need to pick which API client you will use. In addition to good ol' cURL HTTP requests, Protocol offers clients for JavaScript, Python, and PHP. In the following example, you can see how to install each client.

<CodeGroup>

```bash {{ title: 'cURL' }}
# cURL is most likely already installed on your machine
curl --version
```

```bash {{ language: 'js' }}
# Install the Protocol JavaScript SDK
npm install @example/protocol-api --save
```

```bash {{ language: 'python' }}
# Install the Protocol Python SDK
pip install protocol_api
```

```bash {{ language: 'php' }}
# Install the Protocol PHP SDK
composer require protocol/sdk
```

</CodeGroup>

<div className="not-prose">
  <Button href="/sdks" variant="text" arrow="right">
    <>Check out our list of first-party SDKs</>
  </Button>
</div>

## Making your first API request

After picking your preferred client, you are ready to make your first call to the Protocol API. Below, you can see how to send a GET request to the Conversations endpoint to get a list of all your conversations. In the cURL example, results are limited to ten conversations, the default page length for each client.

<CodeGroup tag="GET" label="/v1/conversations">

```bash {{ title: 'cURL' }}
curl -G https://api.protocol.chat/v1/conversations \
  -H "Authorization: Bearer {token}" \
  -d limit=10
```

```js
import ApiClient from '@example/protocol-api'

const client = new ApiClient(token)

await client.conversations.list()
```

```python
from protocol_api import ApiClient

client = ApiClient(token)

client.conversations.list()
```

```php
$client = new \Protocol\ApiClient($token);

$client->conversations->list();
```

</CodeGroup>

<div className="not-prose">
  <Button href="/conversations" variant="text" arrow="right">
    <>Read the docs for the Conversations endpoint</>
  </Button>
</div>

## What's next?

Great, you're now set up with an API client and have made your first request to the API. Here are a few links that might be handy as you venture further into the Protocol API:

- [Grab your API key from the Protocol dashboard](#)
- [Check out the Conversations endpoint](/conversations)
- [Learn about the different error messages in Protocol](/errors)
