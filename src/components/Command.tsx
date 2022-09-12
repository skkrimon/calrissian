import { Tooling } from '../models/tooling';

interface CommandProps {
  tooling: Tooling;
}

function Command(props: CommandProps) {
  return <div>{props.tooling.name}</div>;
}

export default Command;
