CREATE DATABASE vgmanager;

CREATE TABLE videogames (
    vg_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pathlink VARCHAR(255) NOT NULL,
    picturelink varchar(255),
    date_used TIMESTAMP
);