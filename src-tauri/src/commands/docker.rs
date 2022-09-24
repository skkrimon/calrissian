use sys_info::os_type;
use sysinfo::{System, SystemExt, ProcessExt};

#[tauri::command]
pub fn check_docker_running() -> bool {
    let os = os_type();

    let operating_system = match os {
        Ok(os_type) => os_type,
        Err(_) => return false,
    };

    let mut search_value = "dockerd";

    if operating_system == String::from("Windows") {
        search_value = "docker.exe";
    }

    if operating_system == String::from("Darwin") {
        search_value = "docker";
    }

    let mut sys = System::new_all();
    sys.refresh_all();

    for process in sys.processes_by_exact_name(search_value) {
        return process.name() == search_value;
    }

    return false;
}
