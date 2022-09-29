import { TablerIcon } from "@tabler/icons";

export interface NavbarLinkProps {
  label: string;
  to?: string;
  onClick?: () => void;
  icon?: TablerIcon;
  active?: boolean;
}
