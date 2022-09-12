import { Checker } from './checker';
import { LandoEnv } from './../models/lando-env';
import { FileEntry, readDir, readTextFile } from '@tauri-apps/api/fs';
import YAML from 'yamljs';
import { Tooling } from '../models/tooling';

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

  public async parse(): Promise<LandoEnv[]> {
    const envs: LandoEnv[] = [];

    for (let i = 0; i < this._landoEnviorments.length; i++) {
      const landoEnviorment = this._landoEnviorments[i];

      const yamlData = await this.readLandoYaml(landoEnviorment.path);
      const tooling = this.parseTooling(yamlData.tooling);

      envs.push({
        name: yamlData.name.toLowerCase().trim(),
        path: landoEnviorment.path,
        running: await Checker.checkEnvRunning(landoEnviorment.path),
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

  private async readLandoYaml(path: string) {
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

  private parseTooling(yaml: any) {
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
