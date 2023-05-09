CREATE TABLE tblUser (
    userId UUID DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    userEmail VARCHAR(25) UNIQUE,
    userPassword VARCHAR(25) NOT NULL,
    loginTime TIMESTAMP NOT NULL
);
ALTER TABLE tbluser
ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE NOT NULL;

CREATE TABLE tblPrompt(
    promptid UUID DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    promptDescription VARCHAR(1000) NOT NULL,
    promptDate DATE NOT NULL
);

-- Create tblPost table
CREATE TABLE tblPost (
    postid UUID DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    postDescription VARCHAR(5000) NOT NULL,
    attachment BYTEA,
    postTime TIMESTAMP NOT NULL,
    --postComments TEXT[],
    userid UUID REFERENCES tbluser (userid) NOT NULL,
    promptid UUID REFERENCES tblPrompt (promptid) NOT NULL
);
ALTER TABLE tblPost
DROP COLUMN postComments;
ALTER TABLE tblPost
ADD COLUMN postLike INT DEFAULT 0 NOT NULL;
ALTER TABLE tblpost
ALTER COLUMN attachment type VARCHAR;
ALTER TABLE tblPost
ADD COLUMN reportCount INT DEFAULT 0 NOT NULL;
ALTER TABLE tblpost
ADD COLUMN isVisible BOOLEAN DEFAULT true NOT NULL;


CREATE TABLE tblComment(
    commentid UUID DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    commentText VARCHAR(1000) NOT NULL,
    commentTime TIMESTAMP NOT NULL,
    userid UUID REFERENCES tblUser (userid) NOT NULL
);
ALTER TABLE tblcomment
ADD COLUMN postid uuid REFERENCES tblPost(postid) NOT NULL;
ALTER TABLE tblcomment
DROP COLUMN postid;
ALTER TABLE tblComment
ADD COLUMN postid uuid REFERENCES tblPost(postid) ON DELETE CASCADE;
ALTER TABLE tblpost
ALTER COLUMN postid SET NOT NULL;

--report post table
CREATE TABLE tblReport_Post (
    report_postId UUID DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    reportTime TIMESTAMP NOT NULL,
    reason VARCHAR(500) NOT NULL,
    postid UUID REFERENCES tblPost(postid) NOT NULL
);
ALTER TABLE tblreport_post
ADD COLUMN userid UUID REFERENCES tblUser(userid) NOT NULL;
ALTER TABLE tblreport_post
ADD COLUMN postid UUID REFERENCES tblPost(postid) ON DELETE CASCADE;