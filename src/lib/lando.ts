import { ChildProcess, Command } from '@tauri-apps/api/shell';

export class Lando {
  public static start(dir: string): Promise<ChildProcess> {
    const command = new Command('run-lando-command', 'start', { cwd: dir });
    return command.execute();
  }

  public static info(dir: string): Promise<ChildProcess> {
    const command = new Command('run-lando-command', 'info', { cwd: dir });
    return command.execute();
  }

  public static stop(dir: string): Promise<ChildProcess> {
    const command = new Command('run-lando-command', 'stop', { cwd: dir });
    return command.execute();
  }

  public static destroy(dir: string): Promise<ChildProcess> {
    const command = new Command('run-lando-command', ['destroy', '-y'], { cwd: dir });
    return command.execute();
  }

  public static restart(dir: string): Promise<ChildProcess> {
    const command = new Command('run-lando-command', 'restart', { cwd: dir });
    return command.execute();
  }

  public static rebuild(dir: string): Promise<ChildProcess> {
    const command = new Command('run-lando-command', ['rebuild', '-y'], { cwd: dir });
    return command.execute();
  }

  public static poweroff(): Promise<ChildProcess> {
    const command = new Command('run-lando-command', 'poweroff');
    return command.execute();
  }

  public static list(): Promise<ChildProcess> {
    const command = new Command('run-lando-command', 'list');
    return command.execute();
  }
}
