# MongoDB数据库

## 数据库（Database）

- 按照数据结构来组织，储存，管理数据的仓库
- 程序在内存中运行，一旦程序结束或者断电，程序运行中数据会丢失
- 需要将程序运行的数据持久化到硬盘之中，保证数据的安全性
- 数据库是存储数据的仓库



## 数据库分类

数据库主要分为两种：

-关系型数据库（RDBMS）：

- MySQL, Orale, DB2,  SQL Server ......
- 关系型数据库中全都是表

-非关系型数据库（NoSQL）:

- MongoDB, Redis ......
- 键值对数据库
- 文档数据库MongoDB

数据库 -> 服务器：用来保存数据，mongod启动服务端

​			-> 客户端：操作服务器，对数据进行增删改查等操作，mondo启动客户端



## MongoDB

### 1.简介

- 为快速开发互联网Web应用而设计
- 极简，灵活，作为Web应用栈的一部分
- 数据模型是面向文档的，一种类似json的结构（BSON）

### 2.重要概念

- 数据库：一个仓库，可以存放集合
- 集合：类似数据，集合中可以存放文档
- 文档：文档数据库中最小单位，存储和操作的内容都是文档

### 3.使用

#### 3.1下载

- 地址：[ https://www.mongodb.com/download-center/enterprise ]( https://www.mongodb.com/download-center/enterprise )

  （robo 3T：[可视工具](https://robomongo.org/)）

- 偶数版为稳定版，奇数版为开发版

- 对32为系统支持不佳，3.2版本后没有在对32位系统支持

#### 3.2安装

- 安装：双击.msi文件，默认下一步。

- 配置环境变量  C:\Program Files\MongoDB\Server\4.2\bin
    此电脑 -> 右键属性 -> 环境变量 -> 编辑 -> 新增 -> 粘贴上面内容。

    ![mongodb环境变量配置](D:\home\前端体系学习\03.后台服务器\MongoDB\docs\images\mongodb环境变量配置.png)
    
    cmd等命令行工具：mongod ;     // 有相应内容，说明环境变量配置成功。
    
- c盘根目录创建文件夹  C:\data\db

    cmd：mongod;           // 启动mongodb服务器   (db文件自动新增内容)

    **默认是27017端口，可在浏览器中输入：localhost:27017**

    另一个cmd: mongo;   //  连接到mongodb数据库

    （出现 MongoDB Enterprise > ，可以直接输入js代码，说明连接成功）

- 指定路径，端口号启动

  mongod --dbpath 路径名 --port 端口号；
  
- 将mongoDB设置为系统服务，开机自启动（新版是自动开机启动, 省略）
  
  1. 创建目录 C:\data\db	C:\data\log
  
  2. 创建配置文件 C:\Program Files\MongoDB\Server\4.2新建mongod.cfg文件，
  
     权限不够，桌面新建，复制粘贴。
  
     ```
     systemLog:
     	destination: file
     	path: c:\data\log\mongod.log
     storage:
     	dbPath: c:\data\db
     ```
  
  3. 以管理员身份打开cmd：sc.exe ....
  
    

### 4.操作

#### 4.1 常规

- mongo;   	// 连接

- show dbs;   // 查看

- use test;      // 进入test数据库

  （test可以不存在，数据库和集合都不需要手动创建）

- db;                // 显示当前数据库

- show collections;  // 显示所有集合

#### 4.2 CRUD(增删改查)操作

- 插入：db.<collections>.insert(doc)

  ```
  db.stus.insert({name:"xiaoxin",age:15,gender:"male"})
  ```

- 查询：db.stus.find()

- 修改：db.stus.update(查询条件，新对象)

  update()默认使用新对象替换掉旧对象，

  使用$set 修改文档中指定属性，$unset删除，

  updateMany(), updateOne(), replaceOne()。

  ```
  db.stus.update({name:'li'},{age:22});
  db.stus.update(
      {"_id" : ObjectId("5dd3f9bc666a696fa55560c0")},
      {$set: {
          gender:"男",
          address:"liushhe"
       }}
  );
  ```

- 删除：db.stus.remove()

  ```
  db.stus.remove({_id:"001"});
  ```

  删除一个或多个，第二个参数传递true,只删一个。

  传递空对象作为对象，会删除所有。

  db.stus.drop();   删除集合         db.dropDatabase();   删除数据库

  

### 5.文档关系

（1）一对一

通过内嵌文档的形式来体现。

```
db.wifes.insert({
	name: "黄蓉",
	husband: {
		name: "郭靖"
	},
	{
	name: "张三",
	husband: {
		name: "李四"
	}
	}
})
```

（2）一对多

也可以通过内嵌文档体现。

（3）多对多

### 6.sort和投影

```
// 1 升序，-1 降序
db.emp.find({}).sort({sal:1, empno:-1});
// 查询是，可以在第二个参数位置设置查询结果的 投影
db.emp.find({},{ename:1, _id:0, job:1});
```

### 7.Mongoose

#### 7.1简介

- Mongoose是一个通过Node来操作MongoDB的模块
- 是一个对象文档(ODM)库，对Node的原生MongoDB模块进一步优化封装
- 用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处

#### 7.2优点

- 可以为文档创建一个模式结构（Schema 约束）
- 可以对模型中的对象/文档进行验证
- 数据可以通过类型转换为对象模型
- 可以使用中间件来应用业务逻辑挂钩
- 比Node原生的MongoDB驱动更容易

#### 7.3新的对象

- Schema(模式对象)：定义约束了数据库中的文档结构
- Model：作为集合中所有文档的表示，相当于MongoDB数据库中的集合collection
- Document：表示集合中的具体文档，相当于集合中的一个具体的文档





