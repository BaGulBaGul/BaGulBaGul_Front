import Link from "next/link";

interface PostFooterProps {
  title: string, path: string,
}
export function PostFooter(props: PostFooterProps) {
  return (<Link className="footer-btn" href={props.path}>{props.title}</Link>)
}