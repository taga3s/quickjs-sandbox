use axum::{
    routing::{get, post},
    Router,
};
use js_playground::db::state::AppState;
use js_playground::handlers::{
    collect::collect_handler, healthz::healthz_handler, share::share_handler,
};
use sqlx::mysql::MySqlPoolOptions;
use tower_http::trace::{DefaultMakeSpan, DefaultOnRequest, DefaultOnResponse, TraceLayer};
use tracing::Level;
use tracing_subscriber;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    init_app();

    let url = std::env::var("DATABASE_URL").expect("DATABASE_URL is undefined.");
    let pool = MySqlPoolOptions::new()
        .max_connections(12)
        .connect(&url)
        .await?;

    let healthz_router = Router::new().route("/", get(healthz_handler));
    let share_router = Router::new().route("/", post(share_handler));
    let collect_router = Router::new().route("/:hashed_code", get(collect_handler));

    let app = Router::new()
        .nest("/v1/healthz", healthz_router)
        .nest("/v1/share", share_router)
        .nest("/v1/collect", collect_router)
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::new().level(Level::DEBUG))
                .on_request(DefaultOnRequest::new().level(tracing::Level::DEBUG))
                .on_response(DefaultOnResponse::new().level(tracing::Level::DEBUG)),
        )
        .with_state(AppState::new(pool));

    let addr = init_addr();
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

pub fn init_app() {
    dotenvy::dotenv().ok();

    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .with_ansi(true)
        .init();
}

pub fn init_addr() -> String {
    let host = std::env::var("HOST").expect("HOST is undefined.");
    let port = std::env::var("PORT").expect("PORT is undefined.");

    format!("{}:{}", host, port)
}
