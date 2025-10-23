---
outline: deep
---

# 如有问题请反馈对应仓库

## 忘记了管理员密码怎么办

需要通过数据库操作强行更改密码

1. 生成密码哈希

```bash
# 使用 Python 生成（将 NewPassword123! 替换为您的新密码）
python3 -c "import bcrypt; print(bcrypt.hashpw(b'NewPassword123!', bcrypt.gensalt()).decode('utf-8'))"
```

输出示例：`$2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. 进入数据库

**Docker 部署（一体化版本）：**
```bash
docker exec -it oneclickvirt mysql -u root oneclickvirt
```

**独立数据库部署：**
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p oneclickvirt
```

3. 更新密码

```sql
-- 查看管理员账户
SELECT id, username, user_type FROM users WHERE user_type = 'admin';

-- 更新密码（替换为第1步生成的哈希值）
UPDATE users 
SET password = '$2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' 
WHERE username = 'admin';

-- 退出
EXIT;
```

4. 登录测试

使用新密码登录系统验证。

**注意事项**

- 哈希值必须以 `$2a$`、`$2b$` 或 `$2y$` 开头
- 默认管理员用户名为 `admin`，可通过查询确认
- 建议使用强密码（≥8位，含大小写字母、数字、特殊字符）
- 修改前建议备份数据库：
  ```bash
  docker exec oneclickvirt mysqldump -u root oneclickvirt > backup.sql
  ```

## Docker如何删除持久化的数据库和存储卷

删除对应的容器后

执行

```shell
docker volume rm oneclickvirt-data oneclickvirt-storage oneclickvirt-config
```

进行删除
