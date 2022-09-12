import { Tooling } from './tooling';

export interface LandoEnv {
  running: boolean;
  path: string;
  name: string;
  tooling: Tooling[];
}
