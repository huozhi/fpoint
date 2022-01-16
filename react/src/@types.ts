import React from 'react'

export type HandlerMap = {[key: string]: (e?: Event) => void}

export type ScrubHandlerTypes = {
  onScrubStart?(e?: Event): void;
  onScrubMove?(e?: Event): void;
  onScrubEnd?(e?: Event): void;
  onHoverStart?(e?: Event): void;
  onHoverMove?(e?: Event): void;
  onHoverEnd?(e?: Event): void;
}

export type ReleaseHandler = () => void

export type BasicComponentProps = {
  component: string | React.ComponentType<any>,
  style: React.CSSProperties,
}

export type ScrubProps = BasicComponentProps & ScrubHandlerTypes

export type TapHandlerProps = {
  onTouchDown?(e?: Event): void;
  onTouchUp?(e?: Event): void;
  onTouchClick?(e?: Event): void;
  onMouseDown?(e?: Event): void;
  onMouseUp?(e?: Event): void;
  onMouseClick?(e?: Event): void;
  onHoverEnter?(e?: Event): void;
  onHoverLeave?(e?: Event): void;
}

export type TapProps = BasicComponentProps & TapHandlerProps
