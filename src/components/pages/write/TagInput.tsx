export function TagsInput(props: { tags: string[], setTags: any }) {
  function handleKeyDown(e: any) {
    const inputVal = e.target.value;
    if (e.key === "Enter" && !e.nativeEvent.isComposing && inputVal !== '' && !props.tags.includes(inputVal)) {
      props.setTags([...props.tags, inputVal]);
      e.target.value = '';
    }
    else if (e.key === "Backspace" && inputVal === '' && props.tags.length > 0) {
      props.setTags(props.tags.slice(0, -1))
    }
  }

  console.log(props.tags)
  return (
    <div className="tags-container">
      {props.tags.map((tag, index) => (
        <div className="tag-chip" key={index}>
          <span className="text">#{tag}</span>
        </div>
      ))}
      <span className="grow">#
        <input className="tags-input" onKeyDown={handleKeyDown} type="text" placeholder="태그 입력" />
      </span>
    </div>
  )
}