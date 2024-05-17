import { Button, ThemeProvider } from "@mui/material";
import { FooterBtnTheme } from "../common/Themes";

interface PostFooterProps {
  title: string, path: string,
}
export function PostFooter(props: PostFooterProps) {
  return (
    <ThemeProvider theme={FooterBtnTheme}>
      <Button href={props.path}>{props.title}</Button>
    </ThemeProvider>

  )
}