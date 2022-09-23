use which::which;

#[tauri::command]
pub fn which_bridge(binary: String) -> String {
    let result = which(binary);

    return match result {
        Ok(path) => String::from(path.to_string_lossy()),
        Err(error) => error.to_string(),
    };
}
