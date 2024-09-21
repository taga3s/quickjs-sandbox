use axum::{extract::State, http::StatusCode, response::IntoResponse};

use crate::{db::state::AppState, utils::hash};

pub async fn share_handler(
    State(state): State<AppState>,
    body: String,
) -> Result<impl IntoResponse, StatusCode> {
    let code: Option<String> = body.parse().ok();
    let hashed_code = hash::calculate(&code).to_string();

    let hashed_code_existed = sqlx::query!(
        r#"
            select 
                (1) as existed
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

    if let Ok(_) = hashed_code_existed {
        return Ok(hashed_code);
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
