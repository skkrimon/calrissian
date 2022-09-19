#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use which::which;

#[tauri::command]
fn which_bridge(binary: String) -> String {
    let result = which(binary);

    return match result {
        Ok(path) => String::from(path.to_string_lossy()),
        Err(error) => error.to_string()
    }
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![which_bridge])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
