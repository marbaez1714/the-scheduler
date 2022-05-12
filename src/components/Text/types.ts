import {HTMLProps} from "react";

export interface TextProps extends HTMLProps<HTMLParagraphElement> {
  type?: "normal" | "title";
}
