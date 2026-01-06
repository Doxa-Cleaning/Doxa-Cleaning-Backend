DROP TABLE IF EXISTS users     CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE customers (
    id                serial PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    user_id           integer UNIQUE NOT NULL,
    street_add1       VARCHAR(255) NOT NULL,
    street_add2       VARCHAR(255),
    state             VARCHAR(2) NOT NULL,
    city              VARCHAR(100) NOT NULL,
    zip_code          VARCHAR(10) NOT NULL,
    phone             VARCHAR(20) NOT NULL
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE employees (
    id              serial PRIMARY KEY,
    user_id         integer UNIQUE NOT NULL,
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(100) NOT NULL
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE users (
    id              serial PRIMARY KEY,
    customer_id     integer,
    employee_id     integer,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(100) NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

ALTER TABLE customers ADD CONSTRAINT fk_customer_user FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE employees ADD CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES users(id);