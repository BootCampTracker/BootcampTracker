--Bootcamp Tracker elevator pitch:
Introducing the Bootcamp Tracker, an open-source application designed to empower bootcamp graduates on their post-graduation journey. With this powerful tool, you can effortlessly track and compare your post-graduation experiences.

Our app enables you to log crucial data points such as your salary, job benefits, and graduation dates, giving you valuable insights into your career progression. By encouraging data-driven decision-making, we help you make informed choices about your future.

But that's not all. Bootcamp Tracker also fosters connections within the bootcamp community, creating a supportive network of like-minded individuals who are navigating the same challenges as you.

Join us today and take control of your post-bootcamp career. The Bootcamp Tracker is here to guide you 
toward success!"

--Technologies used: 
React, Express, Node, Postgres SQL, Graph.js, MUI (Meterial Usr Interface), Redux. 

--How to get started 
Data Base SQL: tables you will need are 

-- User Table
CREATE TABLE "user"(
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(100) NOT NULL,
"password" VARCHAR(1000) NOT NULL,
"access_level" INT DEFAULT 0 NOT NULL
);

-- Job Info Table
CREATE TABLE "job_info"(
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "user",
  "job_title" VARCHAR(100) NOT NULL,
  "job_level" VARCHAR(100) NOT NULL,
  "job_type" VARCHAR(100) NOT NULL,
  "workplace" VARCHAR(100) NOT NULL,
  "company" VARCHAR(100) NOT NULL,
  "state" VARCHAR(100) NOT NULL,
  "promotion" BOOLEAN DEFAULT FALSE,
  "job_number" INT NOT NULL,
  "hours" INT NOT NULL,
  "date_hired" DATE NOT NULL,
  "salary" INT NOT NULL
);

-- Benefits Table
CREATE TABLE "benefits"(
"id" SERIAL PRIMARY KEY,
"job_id" INT REFERENCES "job_info",
"health_insurance" BOOLEAN DEFAULT FALSE,
"dental_insurance" BOOLEAN DEFAULT FALSE,
"PTO" BOOLEAN DEFAULT FALSE,
"401K" BOOLEAN DEFAULT FALSE,
"equity" BOOLEAN DEFAULT FALSE,
"total_yearly_bonus" INT DEFAULT 0,
"long_term_disability" BOOLEAN DEFAULT FALSE,
"short_term_disability" BOOLEAN DEFAULT FALSE,
"notes" VARCHAR(1000)
);

-- Bootcamp
CREATE TABLE "bootcamp"(
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"graduation_date" DATE,
"bootcamp" VARCHAR(100)
); 