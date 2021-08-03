DROP TABLE IF EXISTS corporations;

CREATE TABLE corporations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name TEXT NOT NULL,
    parent_company TEXT NOT NULL,
    slogan TEXT NOT NULL
);

DROP TABLE IF EXISTS spaceships;

CREATE TABLE spaceships (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ship_name TEXT NOT NULL,
    ship_size TEXT NOT NULL,
    captain_name TEXT NOT NULL,
    fictional_universe TEXT NOT NULL,
    crew_size INTEGER NOT NULL
);