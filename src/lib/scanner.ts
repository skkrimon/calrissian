import { FileEntry, readDir } from '@tauri-apps/api/fs';

export class Scanner {
    private _path: string;
    private _landoEnviorments: FileEntry[];
    
    constructor(path: string) { 
        this._path = path;
        this._landoEnviorments = [];
    }

    public get landoEnviorments() {
        return this._landoEnviorments;
    }

    public async scanDir(): Promise<void> {
        const entries = await readDir(this._path);

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            const isValid = await this.searchLandoConfig(entry);

            if (isValid) {
                this._landoEnviorments.push(entry);
            }
        }
    }

    private async searchLandoConfig(dir: FileEntry): Promise<boolean> {
        const files = await readDir(dir.path);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (file.name?.includes('.lando.yml')) {
                return true;
            }
        }

        return false;
    }
}