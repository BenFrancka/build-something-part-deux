DROP TABLE IF EXISTS corporations;

CREATE TABLE corporations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name TEXT NOT NULL,
    parent_company TEXT NOT NULL,
    slogan TEXT NOT NULL
);