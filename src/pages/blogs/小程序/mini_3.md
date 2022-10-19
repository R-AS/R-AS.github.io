---
title: '第三方平台'
date: '2022-10-19'
thumbnail: 'mini_program/index.png'
type: '小程序'
---

```toc
```
---

下文讲解将小程序授权于第三方开发，由第三方开发代码模版，运用于多个小程序的过程，实现多品牌小程序。

---
#### 不同类型的 ID

| ID 名称 | 说明 |
| --- | --- |
| APPID | - AppID是不同类型的产品的帐号 ID ,是帐号的唯一标识符<br> - 例如公众号的AppID、小程序的AppID、开放平台的AppID、第三方平台的AppID、移动应用的AppID、网站应用的AppID、小商店的 AppID 等等 |
| openid | - openid是微信用户在不同类型的产品的身份ID<br> - 微信用户访问公众号、小程序、移动应用、网站应用、小商店等都会有唯一的openid，但同一个微信用户访问不同的产品生成的 openid 也是不一样的<br> - 例如，对于不同公众号，同一用户的 openid 不同；同理，对于不同的小程序，同一用户的 openid 也是不同的 |
| unionid | - unionid是微信用户在同一个开放平台下的产品的身份ID<br> - 如果开发者拥有多个移动应用、网站应用、和公众帐号（即公众号和小程序），可通过 UnionID 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号，用户的 UnionID 是唯一的。即，同一用户，对同一个微信开放平台下的不同应用，UnionID是相同的 |

---

#### 角色说明

1. 商家小程序(用 A 表示) 与 商家开放平台
    - 商家小程序也就是最终给用户使用的小程序(A)，商家小程序需要先绑定到商家开放平台下，才能实现为商家将小程序的用户身份打通。
2. 模板小程序(用 B 表示)
    - 模版小程序(B)用于开发代码功能，为商家小程序(A)提供代码模板。（相当于 B 为 A 建了一个房间，怎么装修由 A 决定。）
3. 服务商开放平台(用 C 表示)
    - 商家小程序(A)需授权于服务商开放平台，才能为商家小程序(A)提供代码模板等能力。
4. 角色间的关系
![pic_1](/blogs/小程序/mini_3_pic_1.png#pic_center)

---

#### 整体流程

1. 服务商将模板公众号/小程序绑定于第三方平台（服务商开放平台）
2. 商家在微信开放平台进行注册
3. 商家将自己的公众号/小程序绑定于商家开放平台
4. 商家将公众号/小程序授权于服务商
![pic_2](/blogs/小程序/mini_3_pic_2.png#pic_center)
5. 服务商开发小程序，提交模版到第三方平台
6. 服务商根据对应的商家小程序，配置 ext.json 进行小程序提审
7. 对应的商家小程序提审通过，发布上线，商家小程序更新

---

#### 两种 AppId 的比较

| 小程序 appid 类型 | 说明 |
| --- | --- |
| 3rdMiniProgramAppid | - 指的是“开发（模版）小程序”的 appid |
| extAppid | - 指的是授权给第三方平台的商家小程序的 appid |

![pic_3](/blogs/小程序/mini_3_pic_2.png#pic_center)

---

#### 小程序模版库

1. 标准模版和普通模版库区别
    - 普通模板库和标准模板库最大的区别在于，调用[提交代码接口](https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/code/commit.html)时，ext_json支持的传参不同。
    - 如果是普通模板库的模板，则ext_json支持的参数较为丰富，详情可查看：[ext.json特有字段](https://developers.weixin.qq.com/miniprogram/dev/devtools/ext.html)以及[小程序配置说明文档](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)
    - 如果是标准模板库，则ext_json支持的参数仅为{"extAppid":'', "ext": {}, "window": {}}

2. 标准模版库用途
    - 标准模板的主要用途为：基于已经审核通过的标准模板提交的小程序代码，在类目符合要求以及符合其他条件下，可进入“标准模板小程序”审核队列加速审核、然后提交发布，提高发布效率

