CREATE DATABASE serenifyvtwo;

CREATE TABLE tblUSER (
    userId UUID DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    userEmail VARCHAR(25) UNIQUE,
    userName VARCHAR(25) NOT NULL,
    userPassword VARCHAR(25) NOT NULL,
    loginTime TIMESTAMP NOT NULL,
    portrait BYTEA,
    blockList JSON,
    blockedList JSON,
    reportCount INT
);

CREATE TABLE tblPOST (
    post_Id UUID DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    postTitle VARCHAR(50) NOT NULL,
    postText VARCHAR(5000) NOT NULL,
    postImage BYTEA,
    isAnonymous BIT NOT NULL,
    postTime TIMESTAMP NOT NULL,
    isReport BIT NOT NULL,
    saveCount INT,
    likeCount INT,
    commentCount INT,
    userId UUID NOT NULL,
    FOREIGN KEY(userId) REFERENCES tblUSER(userId)
);

-- CREATE TABLE tblCHANNEL (
--     channel_Id INT PRIMARY KEY,
--     channel_name VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE tblTAG (
--     tag_Id INT PRIMARY KEY,
--     tagName VARCHAR(50) NOT NULL,
--     channel_Id INT,
--     FOREIGN KEY(channel_Id) REFERENCES tblCHANNEL(channel_Id)
-- );

CREATE TABLE tblCOMMENT (
    comment_Id INT PRIMARY KEY,
    commentText VARCHAR(2000) NOT NULL,
    commentTime TIMESTAMP NOT NULL,
    likeCount INT,
    post_Id UUID NOT NULL,
    FOREIGN KEY(post_Id) REFERENCES tblPOST(post_Id),
    reply_Id INT,
    FOREIGN KEY(reply_Id) REFERENCES tblCOMMENT(comment_Id)
);

CREATE TABLE tblREPORT_POST (
    report_post_Id INT PRIMARY KEY,
    reportTime TIMESTAMP NOT NULL,
    reason JSON NOT NULL,
    post_Id INT,
    FOREIGN KEY(post_Id) REFERENCES tblPOST(post_Id)
);

CREATE TABLE tblREPORT_COMMENT (
    report_comment_Id INT PRIMARY KEY,
    reportTime TIMESTAMP NOT NULL,
    reason JSON NOT NULL,
    comment_Id INT,
    FOREIGN KEY(comment_Id) REFERENCES tblCOMMENT(comment_Id)
);
