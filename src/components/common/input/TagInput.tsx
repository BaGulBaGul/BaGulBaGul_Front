import { useState } from "react"

function TagsInput(props: {tags: string[], setTags: any}) {
  function handleKeyDown(e: any) {
    const inputVal = e.target.value;
    if(e.key === "Enter" && !e.nativeEvent.isComposing && inputVal !== '' && !props.tags.includes(inputVal)){
      props.setTags([...props.tags,inputVal]);
      e.target.value = '';
    }
  }

  function removeTag(index: number) {
    props.setTags(props.tags.filter((el, i) => i !== index))
  }

  return (
    <div className="tags-container">
      {props.tags.map((tag, index) => (
        <div className="tag-chip" key={index}>
          <span className="text">#{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>&times;</span>
        </div>
      ))}
      <span className="grow">#
        <input className="tags-input" onKeyDown={handleKeyDown} type="text" placeholder="태그 입력" />
      </span>
    </div>
  )
}

export default TagsInput