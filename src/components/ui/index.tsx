import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export * from './primitives/button/button';
export * from './primitives/checkbox/checkbox';
export * from './primitives/cover';
export * from './primitives/focus-aware-status-bar';
export * from './primitives/image/image';
export * from './primitives/input/input';
export * from './primitives/list';
export * from './primitives/modal';
export * from './primitives/progress-bar';
export * from './primitives/select/select';
export * from './primitives/text';
export * from './primitives/title';
export * from './utils';

// export base components from react-native
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
export { SafeAreaView } from 'react-native-safe-area-context';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
