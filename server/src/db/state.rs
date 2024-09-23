use sqlx::{MySql, Pool};

#[derive(Debug, Clone)]
pub struct AppState {
    pub pool: Pool<MySql>,
}

impl AppState {
    pub fn new(pool: Pool<MySql>) -> Self {
        Self { pool }
    }
}
