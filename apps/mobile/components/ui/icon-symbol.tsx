// Fallback using simple emoji icons instead of MaterialIcons to avoid font loading issues

import { Text } from 'react-native';
import { SymbolViewProps } from 'expo-symbols';
import { type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Partial<Record<SymbolViewProps['name'], string>>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to emoji mappings here.
 */
const MAPPING = {
  'house.fill': '🏠',
  'paperplane.fill': '📤',
  'chevron.left.forwardslash.chevron.right': '💻',
  'chevron.right': '›',
  'tray.fill': '📥',
  'arrow.right.circle.fill': '▶️',
  'folder.fill': '📁',
  'calendar.fill': '📅',
  'calendar': '📅',
  'checkmark.circle.fill': '✅',
  'circle': '⚪',
  'arrow.up.circle.fill': '⬆️',
} as IconMapping;

/**
 * An icon component that uses emoji to avoid font loading issues.
 * Icon `name`s are based on SF Symbols and mapped to emoji.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
  weight?: SymbolViewProps['weight'];
}) {
  return <Text style={[{ fontSize: size, color }, style]}>{MAPPING[name]}</Text>;
}
