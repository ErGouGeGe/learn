一、起源
0、HTTP 无状态
HTTP 是无状态的，服务端和客户端如何保持登录状态？
工程师在服务端搞了亿点事情， 就有了下面的解决方案。

1、session 认证

<img src="https://uploader.shimo.im/f/Pvpj6LTSI7CFnAVr.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M">

（1）什么是 session？
服务器为了保存用户状态而创建的一个特殊的对象。
当浏览器第一次登录时，服务器创建一个 session 对象（该对象有一个唯一的 id,一般称之为 sessionId），服务器会将 sessionId 以 cookie 的方式发送给浏览器。当浏览器再次访问服务器时，会将 sessionId 发送过来，服务器依据 sessionId 就可以找到对应的 session 对象。
主要针对 Java Web（JSP）+ Tomcat

（2）Session 的销毁
为了避免 Session 中存储的数据过大，Session 需要销毁：
超时自动销毁。
从用户最后一次访问网站开始，超过一定时间后，服务器自动销毁 Session，以及保存在 Session 中的数据。
Tomcat 服务器默认的 Session 超时时间是 30 分钟，可以利用 web.xml 设置超时时间单位是分钟，设置为 0 表示不销毁。

```
<session-config>
  <session-timeout>30</session-timeout>
</session-config>
```

调用 API 方法，主动销毁 Session
session.invalidate();

（3）缺点
session 保存在 Tomcat 中，一定程度上会增大服务器压力
无法解决分布式共享用户登录状态的问题

2、Session 共享

<img src="https://uploader.shimo.im/f/i4crqERH2wf9gt15.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M" />

（1）基本原理
使用内存缓存系统（内存数据库），将 Session 存储到同一内存数据库（内存数据库集群）中，所有 Tomcat 从内存数据库中获取 Session。

（2）使用内存数据库
MemCache
Redis（NoSQL）

<img src="https://uploader.shimo.im/f/Xh86Nufp3WXLUCCy.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M"/>

NoSQL 仅仅是一个概念，最常见的解释是“non-relational”， “Not Only SQL”也被很多人接受。下图是常见 NoSQL 数据库的分类及对比

<img src="https://uploader.shimo.im/f/EV4o5g03lNURnlI1.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M" />

（3）新问题
MemCache 无法持久化，停机后失去所有用户的登录 Session，无安全机制等，可以使用 Redis 代替
前后端分离怎么解，部署到不同服务器，移动端、小程序

3、Token 认证

<img src ="https://uploader.shimo.im/f/7e1tLVapIrTJdPb3.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M" />

（1）基本原理
主要使用 Redis（单节点/集群）存储用户的登录信息，基本原理类似于 session，将 token（sessionId）作为 key，用于登录鉴权的用户信息作为 value 保存到 Redis 中，用户登录后所有请求携带 token，与后端约定好，可以放到 header 中，也可以是 cookies（允许请求携带 cookies）。
后端在处理请求前（拦截器、过滤器）获取 token，然后进行登录鉴权，鉴权通过后继续 api 请求，失败返回 token 失效信息提示用户登录。

（2）优点
实现前后端分离部署，移动端、小程序，登录认证
借助 Redis 的 expire，可以设置登录有效时长、对用户登录状态延期，跟 web 端 cookies 类似
中心化，最大优点是主动让 Token 失效（删除，不能设置 expire 为 0，最小为 1）
// 保存
redisTemplate.opsForValue().set(key, value, expireTime, TimeUnit.SECONDS);
// 设置过期时间 > 0
redisTemplate.expire(key, expireTime, TimeUnit.SECONDS);
// 删除
redisTemplate.delete(key);
// 是否存在 key
redisTemplate.hasKey(key);
// 根据 key 获取
redisTemplate.opsForValue().get(key);

（3）缺点
每个需要鉴权的请求都要读取 redis，会增大 redis 的压力
如果是分布式 Redis，会增大系统复杂性

4、JWT 认证
请继续往下看

二、JWT
1、介绍
JSON Web Token（JWT）是一个轻量级的认证规范，这个规范允许我们使用 JWT 在用户和服务器之间传递安全可靠的信息。其本质是一个 token，是一种紧凑的 URL 安全方法，用于在网络通信的双方之间传递。

2、结构
{header_urlbase64}.{payload_urlbase64}.{signature}
header，payload，signature 三个部分的字符串通过 . 连接起来。

header
描述 JWT 的元数据
{
"alg": "HS256",
"typ": "JWT"
}
alg：表示前面算法，默认是 HMAC SHA256（写成 HS256）
typ：表示这个令牌（token）的类型（type），JWT 令牌统一写为 JWT

payload
存放实际的数据，JWT 规定了 7 个官方字段
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：唯一 id
除了上述官方字段，这里还可以存放自定义的数据，如：
{
"exp": 1664365790511,
"tenantId": "1",
"appId": "",
"userId": "131SG161E610001",
"serverToken": "7360dbb8-067d-4339-90a4-8955921c9e65",
"refreshToken": "d2b0083f-442d-42ea-a765-3c98d95119cb",
"expiredTime": 0,
"reloginVersion": 0,
"ip": "127.0.0.1"
}

signature
对前两个字符串的签名，防止数据被篡改。签名方法如下：
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
secret：需要传入 salt（盐值），存放在服务端
<img src="https://uploader.shimo.im/f/gHC31HpKKUJzFiEa.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M"/>

Tips
什么是 base64UrlEncode？
Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成\_ 。

3、优点
去中心化，便于分布式系统使用
基本信息可以直接放在 token 中。username，nickname，role
功能权限较少的话，可以直接放在 token 中。用 bit 位表示用户所具有的功能权限（类似于价税那种）

4、缺点
服务端不能主动让 token 失效，这里是一个很大的安全问题，失效时间越长，越不安全
如果将过期时间设置太短，会影响用户体验
jwt token 无法续期

5、来个 Demo
<img src ='https://uploader.shimo.im/f/qksRm4b6DxR8RWfx.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M' />

开个玩笑 😏😎，请看这里

三、符合 OAuth 2.0 标准的 JWT 认证
1、什么是 OAuth 标准？
OAuth（Open Authorization）协议为用户资源的授权提供了一个安全的、开放而又简易的标准。此处省略好几个字，请移步链接查看。

2、什么又是 OAuth 2.0 标准？
有两个令牌 token , 分别是 access_token 和 refresh_token
（1）access_token
访问令牌, 它是一个用来访问受保护资源的凭证。
（2）refresh_token
刷新令牌, 它是一个用来获取 access_token 的凭证，OAuth 2.0 安全最佳实践中, 推荐 refresh_token 是一次性的，使用 refresh_token 获取 access_token 时，同时会返回一个 新的 refresh_token，之前的 refresh_token 就会失效，但是两个 refresh_token 的绝对过期时间是一样的，所以不会存在 refresh_token 快过期就获取一个新的，然后重复，永不过期的情况。
注意：确保 refresh_token 安全性，OAuth2.0 引入了 client_id、client_secret 机制。即每一个应用都会被分配到一个 client_id 和一个对应的 client_secret。应用必须把 client_secret 妥善保管在服务器上，决不能泄露。刷新 access_token 时，需要验证这个 client_secret。
sha256(client_id + refresh_token + client_secret)

3、认证流程
<img src ='https://uploader.shimo.im/f/PofRbmR9JuUuxvUc.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M ' />

4、具体场景
假设有一个用户需要在后台管理界面上操作 6 个小时。

（1）颁发一个有效性很长的 access_token，比如 6 个小时，或者可以更长，这样用户只需要刚开始登录一次，access_token 可以一直使用，直到 access_token 过期，然后重复，这种是不安全的，access_token 的时效太长，也就失去了本身的意义。

<img src="https://uploader.shimo.im/f/38s0VaeNbbsMHqIw.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M
" />

（2）颁发一个 1 小时有效期的 access_token，过期后重新登录授权，这样用户需要登录 6 次，安全倒是有了，但是用户体验极差。

<img src="https://uploader.shimo.im/f/AaPXOWiigVo7SG57.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M"/>

（3）颁发 1 小时有效期的 access_token 和 6 小时有效期的 refresh_token，当 access_token 过期后（或者快要过期的时候），使用 refresh_token 获取一个新的 access_token，直到 refresh_token 过期，用户重新登录，这样整个过程中，用户只需要登录一次，用户体验好。
access_token 泄露了怎么办? 没关系，它很快就会过期。
refresh_token 泄露了怎么办? 没关系，使用 refresh_token 是需要客户端秘钥 client_secret 的。

<img src="https://uploader.shimo.im/f/5GOQ2mCt8KPBGBsH.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M"/>

（4）用户登录后，在后台管理页面上操作 1 个小时后，离开了一段时间，然后 5 个小时后，回到管理页面继续操作，此时 refresh_token 有效期 6 个小时，一直没有过期，也就可以换取新的 access_token，用户在这个过程中，可以不用重复登录。但是在一些安全要求较高的系统中，第二次操作是需要重新登录的，即使 refresh_token 没有过期，因为中间有几个小时，用户是没有操作的，系统猜测用户已离开，并关闭会话。

<img src="https://uploader.shimo.im/f/4B3AAb5CjdcBWS0C.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MDQzNDcwMjQsImZpbGVHVUlEIjoiYjZ3WXJIcnV6eG95c1ZWZyIsImlhdCI6MTcwNDM0NjcyNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjo3Njk1MzYxNX0.ma2DM1xcfpB92XzfLTs-vE1VUSMoYD4BXxlXJxZWp2M
"/>

5、优缺点
优点：
access_token 有效期短，被盗损失更小，安全性更高
如果 refresh_token 被盗了，想刷新 access_token 的话，也需要提供过期的 access_token，盗取难度增加
同时 refresh_token 只有在第一次获取和刷新，access_token 时才会在网络中传输，因此被盗的风险远小于 access_token 从而在一定程度上更安全了一点
所谓的更安全就是让盗取信息者更不容易获得而已

缺点：
开发复杂度增加，这也是一个系统到一定规模必然的情况，可以借助一些认证框架（Spring Security 等）
相对的增加了安全性

6、其他
{
"exp": 1664365790511,
"tenantId": "1",
"appId": "",
"userId": "131SG161E610001",
"serverToken": "7360dbb8-067d-4339-90a4-8955921c9e65",
"refreshToken": "d2b0083f-442d-42ea-a765-3c98d95119cb",
"expiredTime": 0,
"reloginVersion": 0,
"ip": "127.0.0.1"
}
讲到这，对公司系统当前使用的 JWT 里面 serverToken、refreshToken 就有了一些了解了，serverToken --> access_token，refreshToken --> refresh_token。
具体后端实现还是要使用 Redis，存储一些认证相关的信息。
关于 OAuth2.0 在实际系统中使用的介绍可参照《OAuth2.0 详解》。
