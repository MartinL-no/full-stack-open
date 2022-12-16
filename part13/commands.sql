CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Mr Bloggy', 'http://www.bloggy.com', 'Blogging it', 5);
insert into blogs (author, url, title, likes) values ('Babatunde', 'http://www.googleBox.com', 'My tunde life', 99);