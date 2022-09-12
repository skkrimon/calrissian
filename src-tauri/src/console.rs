use std::process::Command;

#[tauri::command]
pub fn open_console() {
let output = if cfg!(target_os = "windows") {
    Command::new("cmd")
            .args(["/C", "echo hello"])
            .output()
            .expect("failed to execute process")
} else {
    Command::new("sh")
            .arg("-c")
            .arg("echo hello")
            .output()
            .expect("failed to execute process")
};

let hello = output.stdout;
}
