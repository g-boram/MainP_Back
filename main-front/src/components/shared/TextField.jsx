import { forwardRef, useState } from "react";

import Text from "./Text";
import Input from "./Input";
import Flex from "./Flex";

const TextField = forwardRef(function TextField(
  { width, label, hasError, helpMessage, onFocus, onBlur, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);

  const labelColor = hasError ? "red" : focused ? "rightBlue" : undefined;

  const handleFocus = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <div style={{ width: width }}>
      <Flex align={"center"} justify={"space-between"}>
        {label ? (
          <Text typography="t13" color={labelColor} display="inline-block" style={{ marginTop: 10, marginBottom: 6 }}>
            {label}
          </Text>
        ) : null}
        {helpMessage ? (
          <Text
            typography="t11"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 10, marginBottom: 6, fontSize: 11 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </Flex>
      <Input ref={ref} aria-invalid={hasError} onFocus={handleFocus} onBlur={handleBlur} {...props} />
    </div>
  );
});

export default TextField;
