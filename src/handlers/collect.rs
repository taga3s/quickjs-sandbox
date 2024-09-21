use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
};
use sqlx::prelude::FromRow;

use crate::db::state::AppState;

#[derive(FromRow, Debug)]
struct JSCode {
    code: String,
}

pub async fn collect_handler(
    State(state): State<AppState>,
    Path(hashed_code): Path<String>,
) -> Result<impl IntoResponse, StatusCode> {
    let result = sqlx::query_as!(
        JSCode,
        r#"
            select 
                code 
            from 
                js_code 
            where 
                hashed_code = ?
        "#,
        &hashed_code
    )
    .fetch_one(&state.pool)
    .await;

    let code = match result {
        Ok(row) => Ok(row.code),
        Err(_) => Err((StatusCode::NOT_FOUND, "Not Found".to_string()).into_response()),
    };

    Ok(code.into_response())
}
