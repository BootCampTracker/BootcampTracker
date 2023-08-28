
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


--Users Table
CREATE TABLE "users"(
"id" SERIAL PRIMARY KEY,
"email" VARCHAR(100) NOT NULL,
"password" VARCHAR(1000) NOT NULL,
"access_level" INTEGER NOT NULL DEFAULT 0,
"graduation_date" DATE NOT NULL,
"bootcamp" VARCHAR(45) NOT NULL
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
"notes" VARCHAR(200) NOT NULL
);

--Role Info Table
CREATE TABLE "role_info"(
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "users",
"benefits_id" INT REFERENCES "benefits",
"salary" INTEGER NOT NULL,
"state" VARCHAR(25) NOT NULL,
"date_hired" DATE NOT NULL,
"role_title" VARCHAR(45) NOT NULL,
"role_number" INTEGER NOT NULL,
"role_location" VARCHAR(45) NOT NULL,
"role_duration" VARCHAR(45) NOT NULL
);