use axum::{
    routing::{get, post},
    Router,
};
use js_playground::handlers::healthz::healthz_handler;
use js_playground::{db::state::AppState, handlers::share::share_handler};
use sqlx::mysql::MySqlPoolOptions;
use tower_http::trace::{DefaultMakeSpan, DefaultOnRequest, DefaultOnResponse, TraceLayer};
use tracing::Level;
use tracing_subscriber;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().unwrap();

    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .with_ansi(true)
        .init();

    let uri = std::env::var("DATABASE_URL")?;
    let pool = MySqlPoolOptions::new()
        .max_connections(4)
        .connect(&uri)
        .await?;

    let app = Router::new()
        .route("/v1/healthz", get(healthz_handler))
        .route("/v1/share", post(share_handler))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::new().level(Level::DEBUG))
                .on_request(DefaultOnRequest::new().level(tracing::Level::DEBUG))
                .on_response(DefaultOnResponse::new().level(tracing::Level::DEBUG)),
        )
        .with_state(AppState::new(pool));

    let listener = tokio::net::TcpListener::bind("localhost:8080").await?;
    axum::serve(listener, app).await?;

    Ok(())
}
