import { FileEntry, readDir, readTextFile } from '@tauri-apps/api/fs';
import YAML from 'yamljs';

import { LandoEnv } from '../models/lando-env';
import { Tooling } from '../models/tooling';
import { Checker } from './checker';

export class Scanner {
  private readonly _path: string;
  private readonly _landoEnvironment: FileEntry[];

  constructor(path: string) {
    this._path = path;
    this._landoEnvironment = [];
  }

  public get landoEnvironment(): FileEntry[] {
    return this._landoEnvironment;
  }

  public async scanDir(): Promise<void> {
    const entries = await readDir(this._path);

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      const isValid = await this.searchLandoConfig(entry);

      if (isValid) {
        this._landoEnvironment.push(entry);
      }
    }
  }

  public async parse(): Promise<LandoEnv[]> {
    const envs: LandoEnv[] = [];

    for (let i = 0; i < this._landoEnvironment.length; i++) {
      const landoEnvironment = this._landoEnvironment[i];

      const yamlData = await this.readLandoYaml(landoEnvironment.path);
      const tooling = this.parseTooling(yamlData.tooling);

      envs.push({
        name: yamlData.name.toLowerCase().trim(),
        path: landoEnvironment.path,
        running: await Checker.checkEnvRunning(landoEnvironment.path),
        tooling: tooling,
      });
    }

    return envs;
  }

  private async searchLandoConfig(dir: FileEntry): Promise<boolean> {
    try {
      const files = await readDir(dir.path);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.name?.includes('.lando.yml')) {
          return true;
        }
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async readLandoYaml(path: string): Promise<any> {
    const content = await readTextFile(path + '/.lando.yml');
    const parsedContent = YAML.parse(content);

    try {
      const contentBase = await readTextFile(path + '/.lando.yml');
      const contentBaseParsed = YAML.parse(contentBase);

      return { ...parsedContent, ...contentBaseParsed };
    } catch (err) {
      return parsedContent;
    }
  }

  private parseTooling(yaml: { [key: string]: { [key: string]: string } }): Tooling[] {
    if (yaml === undefined) {
      return [];
    }

    const keys = Object.keys(yaml);
    const arr: Tooling[] = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      arr.push({
        name: key,
        cmd: yaml[key].cmd,
        service: yaml[key].service,
        description: yaml[key].description ?? null,
      });
    }

    return arr;
  }
}
