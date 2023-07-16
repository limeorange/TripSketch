import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  style: {
    color: "blue" | "white";
    width?: number;
    height?: number;
    fontSize?: number;
  };
  title: string;
  onPress: () => void;
}

/** 커스텀 버튼 컴포넌트 */
const Button = ({ style, onPress, title, ...rest }: ButtonProps) => {
  const buttonColor: string = style.color === "blue" ? "#73BBFB" : "white";
  const textColor: string = style.color === "blue" ? "white" : "#73BBFB";

  return (
    <TouchableOpacity
      style={[
        {
          width: style.width ? style.width : "100%",
          height: style.height ? style.height : "auto",
          backgroundColor: buttonColor,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 7,
          paddingHorizontal: 14,
        },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      <Text
        style={{
          fontSize: style.fontSize || 16,
          color: textColor,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
