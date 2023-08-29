--database name:  bootcamp_tracker

-- User Table
CREATE TABLE "user"(
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(100) NOT NULL,
"password" VARCHAR(1000) NOT NULL,
"access_level" INTEGER NOT NULL DEFAULT 0,
"graduation_date" DATE NOT NULL,
"bootcamp" VARCHAR(100)
);

-- Benefits Table
CREATE TABLE "benefits"(
"id" SERIAL PRIMARY KEY,
"health_insurance" BOOLEAN DEFAULT FALSE,
"dental_insurance" BOOLEAN DEFAULT FALSE,
"PTO" BOOLEAN DEFAULT FALSE,
"401K" BOOLEAN DEFAULT FALSE,
"equity" BOOLEAN DEFAULT FALSE,
"bonuses" BOOLEAN DEFAULT FALSE,
"long_term_disability" BOOLEAN DEFAULT FALSE,
"short_term_disability" BOOLEAN DEFAULT FALSE,
"notes" VARCHAR(1000)
);

--Job Info Table
CREATE TABLE "job_info"(
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "user",
  "benefits_id" INT REFERENCES "benefits",
  "job_title" VARCHAR(100) NOT NULL,
  "job_role" VARCHAR(100) NOT NULL,
  "job_type" VARCHAR(100) NOT NULL,
  "workplace" VARCHAR(100) NOT NULL,
  "company" VARCHAR(100) NOT NULL,
  "state" VARCHAR(100) NOT NULL,
  "promotion" BOOLEAN DEFAULT FALSE,
  "job_number" INTEGER NOT NULL,
  "hours" INTEGER NOT NULL,
  "date_hired" DATE NOT NULL,
  "salary" INTEGER NOT NULL
);


