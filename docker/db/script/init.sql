create table if not exists js_code (
    id serial primary key auto_increment,
    code text not null,
    hashed_code text not null,
    created_at timestamp not null default current_timestamp
);
