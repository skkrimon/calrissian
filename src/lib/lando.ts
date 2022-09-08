import { invoke } from '@tauri-apps/api/tauri';

export class Lando {
    public static start(dir: string): Promise<boolean> {
        return invoke('lando_start', { dir: dir });
    }
}