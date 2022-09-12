#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::console::open_console;

mod console;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_console])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
