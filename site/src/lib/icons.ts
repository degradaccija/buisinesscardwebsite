import { Bot, Code2, Server, Terminal, Wrench, type LucideIcon } from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  Code2,
  Bot,
  Terminal,
  Server,
  Wrench,
};

export function getServiceIcon(name: string): LucideIcon {
  return serviceIcons[name] ?? Code2;
}
