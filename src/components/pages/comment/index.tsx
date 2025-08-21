import { createTheme } from "@mui/material";
import { CommentBlock } from "./CommentBlock";
import { ReplyBlock } from "./ReplyBlock";
import { RepliedComment } from './RepliedComment';
import { Replies } from './Replies';
import { CommentLikeButton } from "./CommentLikeButton";
import { ModifyInput, ModifyInputR } from "./ModifyInput";
import { CommentFooter } from "./CommentFooter";
import { MemoizedReplyFooter } from "./ReplyFooter";
import ScrollToTop from "./ScrollToTop";

export {
  CommentBlock, ReplyBlock,
  RepliedComment, Replies, 
  CommentLikeButton,
  CommentFooter, MemoizedReplyFooter,
  ModifyInput, ModifyInputR,
  ScrollToTop,
}

export const commentTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0, position: 'relative', padding: '13px 24px', fontSize: 14, lineHeight: '160%',
          '&::placeholder': { color: '#C1C1C1' }
        },
        notchedOutline: { border: '0' }
      }
    },
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF !important', color: '#4A6AFE',
          fontSize: '14px', borderRadius: 0, fontWeight: 400, width: '70px', height: '48px',
          '&:hover': { backgroundColor: '#FFFFFF !important', color: '#1E1E1E' },
          '&:active': { backgroundColor: '#FFFFFF !important', color: '#6C6C6C', fontWeight: 600, }
        }
      }
    }
  },
});