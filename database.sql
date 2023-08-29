--database name:  bootcamp_tracker

-- User Table
CREATE TABLE "user"(
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(100) NOT NULL,
"password" VARCHAR(1000) NOT NULL,
"access_level" INTEGER NOT NULL DEFAULT 0
);

DROP TABLE "";
-- Benefits Table
CREATE TABLE "benefits"(
"id" SERIAL PRIMARY KEY,
"health_insurance" VARCHAR(40) NOT NULL,
"dental_insurance" VARCHAR(40) NOT NULL,
"PTO" VARCHAR(40) NOT NULL,
"401K" VARCHAR(40) NOT NULL,
"equity" VARCHAR(40) NOT NULL,
"bonuses" VARCHAR(40) NOT NULL,
"long_term_disability" VARCHAR(40) NOT NULL,
"short_term_disability" VARCHAR(40) NOT NULL,
"notes" VARCHAR(200)
);

--Job Info Table
CREATE TABLE "job_info"(
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "user",
  "benefits_id" INT REFERENCES "benefits",
  "job_title" VARCHAR(50) NOT NULL,
  "job_role" VARCHAR(50) NOT NULL,
  "company" VARCHAR(50) NOT NULL,
  "state" VARCHAR(55) NOT NULL,
  "promotions" VARCHAR(55) NOT NULL,
  "job_number" VARCHAR(55) NOT NULL,
  "hours" VARCHAR(55) NOT NULL,
  "job_duration" VARCHAR(55) NOT NULL,
  "job_type" VARCHAR(55) NOT NULL,
  "date_hired" DATE NOT NULL,
  "salary" INTEGER NOT NULL,
  "graduation_date" DATE,
  "bootcamp" VARCHAR(45)
);


