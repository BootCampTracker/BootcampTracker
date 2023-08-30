--database name:  bootcamp_tracker

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
  "user_id" INT REFERENCES "user" NOT NULL,
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
"job_id" INT REFERENCES "job_info" (id) NOT NULL,
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
"user_id" INT REFERENCES "user" NOT NULL,
"graduation_date" DATE NOT NULL,
"bootcamp" VARCHAR(100) NOT NULL
);