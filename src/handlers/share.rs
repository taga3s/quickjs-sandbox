use axum::{extract::State, http::StatusCode, response::IntoResponse};

use crate::{db::state::AppState, utils::hash};

#[derive(sqlx::FromRow)]
struct JSCode {
    hashed_code: String,
}

pub async fn share_handler(
    State(state): State<AppState>,
    body: String,
) -> Result<impl IntoResponse, StatusCode> {
    let code: Option<String> = body.parse().ok();
    let hashed_code = hash::calculate(&code).to_string();

    let jscode_already_shared = sqlx::query_as!(
        JSCode,
        r#"
            select 
                hashed_code
            from 
                js_code 
            where 
                hashed_code = ?
        "#,
        &hashed_code
    )
    .fetch_one(&state.pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()));

    match jscode_already_shared {
        Ok(jscode) => return Ok(jscode.hashed_code),
        Err(_) => {}
    }

    let _ = sqlx::query!(
        r#"
            insert into 
                js_code (code, hashed_code) 
            values 
                (?, ?)
        "#,
        &code,
        &hashed_code
    )
    .execute(&state.pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()));

    Ok(hashed_code)
}
