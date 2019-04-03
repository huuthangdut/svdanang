export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  divider?: boolean;
  children?: NavItem[];
}