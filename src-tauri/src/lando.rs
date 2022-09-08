use std::process::Command;

#[tauri::command]
pub fn lando_start(dir: String) -> bool {
    let child = Command::new("lando")
        .arg("start")
        .current_dir(dir)
        .spawn()
        .expect("failed to start lando env");

    let output = child.wait_with_output().expect("failed to wait for child");

    output.status.success()
}
