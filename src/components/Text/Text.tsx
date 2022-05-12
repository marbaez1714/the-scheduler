import classNames from "classnames";
import {TextProps} from "./types";

const Text = ({className, type = "normal", ...rest}: TextProps) => {
  return (
    <p
      className={classNames([
        "font-roboto",
        {"text-base": type === "normal"},
        {"text-4xl font-medium": type === "title"},
        className,
      ])}
      {...rest}
    />
  );
};

export default Text;
