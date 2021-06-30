import React from 'react'

export default function GifRender(props) {
  return (
    <div className="m-1">
      <img className="rounded" src={props.url} alt=""/>
    </div>
  )
}
