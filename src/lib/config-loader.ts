import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';
import { Config } from './../models/config';

export class ConfigLoader {
  public async load(): Promise<Config> {
    const configString = await this.readConfigFile();
    const config: Config = JSON.parse(configString);

    return config;
  }

  public async writeConfig(config: Config): Promise<void> {
    await writeTextFile('config.json', JSON.stringify(config), { dir: BaseDirectory.Config });
  }

  private async readConfigFile(): Promise<string> {
    try {
      return await readTextFile('config.json', { dir: BaseDirectory.Config });
    } catch (err) {
      const baseConfig: Config = {
        projectDir: 'C:\\Dev\\www',
      };

      await writeTextFile('config.json', JSON.stringify(baseConfig), { dir: BaseDirectory.Config });
      return await this.readConfigFile();
    }
  }
}
