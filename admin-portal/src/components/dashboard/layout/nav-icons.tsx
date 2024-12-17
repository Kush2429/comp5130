import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { Flag as FlagIcon } from '@phosphor-icons/react/dist/ssr/Flag';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { Note as NoteIcon } from '@phosphor-icons/react/dist/ssr/Note';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'x-square': XSquare,
  flag: FlagIcon,
  user: UserIcon,
  users: UsersIcon,
  note: NoteIcon,
} as Record<string, Icon>;
