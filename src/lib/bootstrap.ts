import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';

export class Bootstrap {
  public init() {
    this.loadConfig();
  }

  private async loadConfig() {
    try {
      const config = await readTextFile('calrissian.json', { dir: BaseDirectory.App });
    } catch (err) {
      const json = {
        projectPath: '',
      };

      await writeTextFile('calrissian.json', JSON.stringify(json), { dir: BaseDirectory.App });
    }
  }
}
