use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::prelude::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
struct Healthz {
    state: String,
}

pub async fn healthz_handler() -> Result<impl IntoResponse, StatusCode> {
    let entity = Healthz {
        state: String::from("ok"),
    };

    Ok(Json(json!(entity)).into_response())
}
