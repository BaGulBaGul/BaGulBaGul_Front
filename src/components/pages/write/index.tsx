
// textarea 높이 자동 조정 함수
export const autoResizeTextarea = (e: any, setContent: any) => {
  const textarea = e.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight + 10}px`;
  setContent(textarea.value);
};