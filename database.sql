--database name:  bootcamp_tracker

--Users Table
CREATE TABLE "user"(
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(100) NOT NULL,
"password" VARCHAR(1000) NOT NULL,
"access_level" INTEGER NOT NULL DEFAULT 0,
"graduation_date" DATE,
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
"notes" VARCHAR(1000) NOT NULL
);

--Job Info Table
CREATE TABLE "job_info"(
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"benefits_id" INT REFERENCES "benefits",
"salary" INTEGER NOT NULL,
"state" VARCHAR(55) NOT NULL,
"date_hired" DATE NOT NULL,
"job_title" VARCHAR(100) NOT NULL,
"job_number" INTEGER NOT NULL,
"job_location" VARCHAR(100) NOT NULL,
"job_duration" VARCHAR(100) NOT NULL
);