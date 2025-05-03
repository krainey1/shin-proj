import { Text as DefaultText, TextProps } from 'react-native';

export function Text(props: TextProps) {
  return (
    <DefaultText
      {...props}
      style={[{ fontFamily: 'Nunito' }, props.style]}
    />
  );
}
