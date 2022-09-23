#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;

use commands::{docker::check_docker_running, which::which_bridge};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![check_docker_running, which_bridge])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
