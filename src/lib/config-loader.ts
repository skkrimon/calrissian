import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';

import { Config } from '../models/config';

export class ConfigLoader {
  private BASE_CONFIG: Config = {
    projectDir: '',
  };

  public static async writeConfig(config: Config): Promise<void> {
    await writeTextFile('config.json', JSON.stringify(config), { dir: BaseDirectory.Config });
  }

  public async load(): Promise<Config> {
    return await this.readConfigFile();
  }

  private async readConfigFile(): Promise<Config> {
    try {
      const config = await readTextFile('config.json', { dir: BaseDirectory.Config });
      return JSON.parse(config);
    } catch (err) {
      await ConfigLoader.writeConfig(this.BASE_CONFIG);
      return this.BASE_CONFIG;
    }
  }
}
