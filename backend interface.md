# http method from front end to backend
## post to login
![image](https://user-images.githubusercontent.com/42493663/160507172-1526fc32-ae31-4f96-b4ea-c6e767568499.png)
![image](https://user-images.githubusercontent.com/42493663/160507211-4075a579-40ca-4fef-87cd-f2c628b966eb.png)
## post to register
# database info
sqlite> .schema articles
CREATE TABLE articles(
                                id                      INTEGER PRIMARY KEY AUTOINCREMENT,
                                author          TEXT            NOT NULL,
                                title           TEXT            NOT NULL,
                                content         TEXT            NOT NULL,
                                likes       INTEGER     default 0,
                                dislikes    INTEGER     default 0,
                                FOREIGN KEY (author) REFERENCES users(username)

            );
sqlite> .schema comment
CREATE TABLE comment(
                    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        topic_id INTEGER NOT NULL,
                        comment_user TEXT NOT NULL,
                        likes INTEGER default 0,
                        dislikes INTEGER  default 0,
                        foreign key (topic_id) references articles(id),
                    foreign key (comment_user) references users(username)
                        );
sqlite> .schema gatorlink
CREATE TABLE gatorlink(
                        gatorId TEXT PRIMARY KEY NOT NULL,
                        password TEXT            NOT NULL
                        );
sqlite> .schema users
CREATE TABLE users(
                        username        TEXT PRIMARY KEY        NOT NULL,
                        password        TEXT                            NOT NULL,
                        gatorId     TEXT                NOT NULL,
                        birthday    date,
                        gender      TEXT  default 'unknown' check(gender = 'male' or gender='female' or gender='unknown'),
                    profile_photo TEXT             default "./test.PNG" ,
                        foreign key (gatorID) references gatorlink(gatorId)
        );

