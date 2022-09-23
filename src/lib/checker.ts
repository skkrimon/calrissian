import { invoke } from '@tauri-apps/api';
import * as dJSON from 'dirty-json';

import { List } from '../models/list';
import { Lando } from './lando';

export class Checker {
  public static async checkEnvRunning(dir: string): Promise<boolean> {
    const lists = await Lando.list();
    const parsed: List[] = dJSON.parse(lists.stdout);

    for (let i = 0; i < parsed.length; i++) {
      const list = parsed[i];

      if (list.src === 'unknown') {
        continue;
      }

      for (let i = 0; i < list.src.length; i++) {
        if (list.src[i].includes(dir)) {
          return true;
        }
      }
    }

    return false;
  }

  public static async checkDockerRunning(): Promise<boolean> {
    return await invoke('check_docker_running');
  }
}
